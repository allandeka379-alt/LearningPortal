import { describe, expect, it } from "vitest";
import { createUser } from "../../../tests/factories";
import { bootstrapRefusal, bootstrapSuperAdmin } from "./bootstrap-admin";

const verified = { status: "ACTIVE", emailVerifiedAt: new Date() };

describe("bootstrapRefusal", () => {
  it("allows a verified, active account when no super admin exists", () => {
    expect(bootstrapRefusal({ activeSuperAdmins: 0, user: verified })).toBeNull();
  });
  it("refuses once any active super admin exists", () => {
    expect(bootstrapRefusal({ activeSuperAdmins: 1, user: verified })).toMatch(/already exists/);
  });
  it("refuses a missing, inactive or unverified account", () => {
    expect(bootstrapRefusal({ activeSuperAdmins: 0, user: null })).toMatch(/register/);
    expect(bootstrapRefusal({ activeSuperAdmins: 0, user: { ...verified, status: "SUSPENDED" } })).toMatch(/not active/);
    expect(bootstrapRefusal({ activeSuperAdmins: 0, user: { ...verified, emailVerifiedAt: null } })).toMatch(/Verify/);
  });
});

describe("bootstrapSuperAdmin", () => {
  it("is refused while an active super admin exists (never adds a second one)", async () => {
    await createUser({ roles: ["SUPER_ADMIN"] });
    const target = await createUser();
    await expect(bootstrapSuperAdmin(target.user.emailNormalized as string)).rejects.toThrow(/already exists/);
  });
});
