import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  user?: {
    id: number;
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
}

export const sessionOptions = {
  password: "senha_longa_complexa_e_totalmente_aleatoria_e_segura_123456", 
  cookieName: "techstore_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", 
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }
  
  return session;
}