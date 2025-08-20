import { db } from "./firebase"
import {
	collection,
	getDocs,
	getDoc,
	query,
	where,
	orderBy,
	limit,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    Timestamp,
} from "firebase/firestore"

export type Project = {
	id: string
	name: string
	description?: string
	team?: string
	members?: number
	apiKeys?: number
	status?: string
	createdAt?: string
	lastActivity?: string
}

export type Member = {
	id: string
	name: string
	email: string
	role: string
	avatar?: string
	joinedAt?: string
	lastActive?: string
	projects?: string[]
}

export type ApiKey = {
	id: string
	name: string
	description?: string
	key: string
	project?: string
	projectId?: string
	status?: string
	createdAt?: string
	lastUsed?: string
	expiresAt?: string
	requests?: number
	environment?: string
    serviceName?: string
    website?: string
    docsUrl?: string
    monthlyLimit?: number
    monthlyCost?: number
    rotationDays?: number
    tags?: string[]
}

function toIso(value: any): string | undefined {
    if (!value) return undefined
    if (typeof value === "string") return value
    // Firestore Timestamp
    if (value instanceof Timestamp) return value.toDate().toISOString()
    if (typeof value === "object" && "seconds" in value && "nanoseconds" in value) {
        const ms = (value.seconds as number) * 1000 + Math.floor((value.nanoseconds as number) / 1e6)
        return new Date(ms).toISOString()
    }
    if (value instanceof Date) return value.toISOString()
    return String(value)
}

function normalizeProject(data: any): Project {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        team: data.team,
        members: data.members,
        apiKeys: data.apiKeys,
        status: data.status,
        createdAt: toIso(data.createdAt),
        lastActivity: toIso(data.lastActivity),
    }
}

function normalizeMember(data: any): Member {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
        joinedAt: toIso(data.joinedAt),
        lastActive: toIso(data.lastActive),
        projects: Array.isArray(data.projects) ? data.projects : [],
    }
}

function normalizeApiKey(data: any): ApiKey {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        key: data.key,
        project: data.project,
        projectId: data.projectId,
        status: data.status,
        createdAt: toIso(data.createdAt),
        lastUsed: toIso(data.lastUsed),
        expiresAt: toIso(data.expiresAt),
        requests: data.requests,
        environment: data.environment,
        serviceName: data.serviceName,
        website: data.website,
        docsUrl: data.docsUrl,
        monthlyLimit: typeof data.monthlyLimit === "number" ? data.monthlyLimit : undefined,
        monthlyCost: typeof data.monthlyCost === "number" ? data.monthlyCost : undefined,
        rotationDays: typeof data.rotationDays === "number" ? data.rotationDays : undefined,
        tags: Array.isArray(data.tags) ? data.tags : undefined,
    }
}

export async function fetchProjects(): Promise<Project[]> {
	const snapshot = await getDocs(query(collection(db, "projects"), orderBy("name")))
	return snapshot.docs.map((d) => normalizeProject({ id: d.id, ...(d.data() as any) }))
}

export async function createProject(input: { name: string; description?: string; team?: string }) {
    const now = new Date().toISOString()
    const ref = await addDoc(collection(db, "projects"), {
        name: input.name,
        description: input.description || "",
        team: input.team || "",
        members: 0,
        apiKeys: 0,
        status: "active",
        createdAt: now,
        lastActivity: now,
    })
    return ref.id
}

export async function getProject(id: string): Promise<Project | null> {
    const snapshot = await getDoc(doc(db, "projects", id))
    if (!snapshot.exists()) return null
    return normalizeProject({ id: snapshot.id, ...(snapshot.data() as any) })
}

export async function deleteProject(id: string) {
    await deleteDoc(doc(db, "projects", id))
}

export async function getMember(id: string): Promise<Member | null> {
    const snapshot = await getDoc(doc(db, "teamMembers", id))
    if (!snapshot.exists()) return null
    return normalizeMember({ id: snapshot.id, ...(snapshot.data() as any) })
}

export async function deleteMember(id: string) {
    await deleteDoc(doc(db, "teamMembers", id))
}

export async function updateMemberRole(id: string, role: string) {
    await updateDoc(doc(db, "teamMembers", id), { role })
}

export async function fetchMembers(projectId?: string): Promise<Member[]> {
	const base = collection(db, "teamMembers")
	const q = projectId ? query(base, where("projects", "array-contains", projectId)) : base
	const snapshot = await getDocs(q)
	return snapshot.docs.map((d) => normalizeMember({ id: d.id, ...(d.data() as any) }))
}

export async function fetchApiKeys(projectId?: string): Promise<ApiKey[]> {
	const base = collection(db, "apiKeys")
	const q = projectId ? query(base, where("projectId", "==", projectId)) : base
	const snapshot = await getDocs(q)
	return snapshot.docs.map((d) => normalizeApiKey({ id: d.id, ...(d.data() as any) }))
}

export async function createApiKey(input: {
    name: string
    serviceName?: string
    description?: string
    key: string
    project?: string
    projectId?: string
    environment?: string
    status?: string
    expiresAt?: string
    website?: string
    docsUrl?: string
    monthlyLimit?: number
    monthlyCost?: number
    rotationDays?: number
    tags?: string[]
}) {
    const now = new Date().toISOString()
    const ref = await addDoc(collection(db, "apiKeys"), {
        name: input.name,
        serviceName: input.serviceName || "",
        description: input.description || "",
        key: input.key,
        project: input.project || "",
        projectId: input.projectId || "",
        status: input.status || "active",
        createdAt: now,
        lastUsed: now,
        expiresAt: input.expiresAt || "",
        requests: 0,
        environment: input.environment || "development",
        website: input.website || "",
        docsUrl: input.docsUrl || "",
        monthlyLimit: typeof input.monthlyLimit === "number" ? input.monthlyLimit : 0,
        monthlyCost: typeof input.monthlyCost === "number" ? input.monthlyCost : 0,
        rotationDays: typeof input.rotationDays === "number" ? input.rotationDays : 90,
        tags: Array.isArray(input.tags) ? input.tags : [],
    })
    return ref.id
}

export async function deleteApiKey(id: string) {
    await deleteDoc(doc(db, "apiKeys", id))
}

export async function fetchMembersPreview(limitCount = 4): Promise<Member[]> {
	const snapshot = await getDocs(query(collection(db, "teamMembers"), orderBy("name"), limit(limitCount)))
	return snapshot.docs.map((d) => normalizeMember({ id: d.id, ...(d.data() as any) }))
}

export async function addMember(input: { name?: string; email: string; role: string; projects?: string[] }) {
    const now = new Date().toISOString()
    const ref = await addDoc(collection(db, "teamMembers"), {
        name: input.name || input.email.split("@")[0],
        email: input.email,
        role: input.role,
        avatar: "",
        joinedAt: now,
        lastActive: "just now",
        projects: input.projects || [],
    })
    return ref.id
}


