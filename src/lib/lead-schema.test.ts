import { describe, expect, it } from "vitest";
import { isFreeEmail } from "@/config/lead";
import { leadFieldsSchema, leadRequestSchema } from "./lead-schema";

const valid = {
  nome: "Mario",
  cognome: "Rossi",
  email: "Mario.Rossi@Azienda-Esempio.it ",
  azienda: "Azienda Esempio S.p.A.",
  ruolo: "HSE / RSPP",
  settore: "Chimica e petrolchimica",
  paese: "Italia",
  telefono: "",
  consensoPrivacy: true,
  consensoNewsletter: false,
};

describe("leadFieldsSchema", () => {
  it("accepte un lead valide et normalise l'email", () => {
    const r = leadFieldsSchema.parse(valid);
    expect(r.email).toBe("mario.rossi@azienda-esempio.it");
  });

  it.each(["mario@gmail.com", "mario@hotmail.it", "mario@libero.it", "mario@icloud.com", "MARIO@YAHOO.IT"])(
    "refuse l'email personnelle %s",
    (email) => {
      const r = leadFieldsSchema.safeParse({ ...valid, email });
      expect(r.success).toBe(false);
      expect(r.error?.issues[0].path).toEqual(["email"]);
    },
  );

  it("exige le consentement privacy", () => {
    expect(leadFieldsSchema.safeParse({ ...valid, consensoPrivacy: false }).success).toBe(false);
  });

  it("garde la newsletter facultative (false par défaut)", () => {
    const rest: Partial<typeof valid> = { ...valid };
    delete rest.consensoNewsletter;
    expect(leadFieldsSchema.parse(rest).consensoNewsletter).toBe(false);
  });

  it("refuse un settore hors liste", () => {
    expect(leadFieldsSchema.safeParse({ ...valid, settore: "Edilizia" }).success).toBe(false);
  });

  it("valide le téléphone seulement s'il est rempli", () => {
    expect(leadFieldsSchema.safeParse({ ...valid, telefono: "+39 035 123456" }).success).toBe(true);
    expect(leadFieldsSchema.safeParse({ ...valid, telefono: "abc" }).success).toBe(false);
  });

  it("refuse les champs obligatoires vides", () => {
    const r = leadFieldsSchema.safeParse({ ...valid, nome: "  ", azienda: "" });
    expect(r.error?.issues.map((i) => i.path[0])).toEqual(expect.arrayContaining(["nome", "azienda"]));
  });
});

describe("leadRequestSchema", () => {
  it("applique les valeurs par défaut (tracking, honeypot)", () => {
    const r = leadRequestSchema.parse({ lead: valid, answers: { q1: "q1-a" } });
    expect(r.website).toBe("");
    expect(r.tracking.utm_source).toBe("");
  });
});

describe("isFreeEmail", () => {
  it("distingue les domaines personnels et professionnels", () => {
    expect(isFreeEmail("a@gmail.com")).toBe(true);
    expect(isFreeEmail("a@atexitalia.it")).toBe(false);
  });
});
