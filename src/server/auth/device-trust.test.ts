import { describe, expect, it } from "vitest";
import { createUser } from "../../../tests/factories/index";
import { MAX_DEVICE_ACCOUNTS, countTrustedDeviceFailure, rememberDevice, trustedDeviceFor } from "./device-trust";

const uuid = (n: number) => `00000000-0000-7000-8000-${String(n).padStart(12, "0")}`;

describe("remembered devices", () => {
  it("remembers accounts on one device id, newest first, capped", async () => {
    const { user } = await createUser({ roles: ["STUDENT"] });
    let token = rememberDevice(null, user.id);
    const deviceId = await trustedDeviceFor(token, user.id);
    expect(deviceId).toMatch(/^[A-Za-z0-9_-]{16,64}$/);
    for (let i = 0; i < MAX_DEVICE_ACCOUNTS; i += 1) token = rememberDevice(token, uuid(i));
    // The oldest account dropped out; the device keeps its id.
    expect(await trustedDeviceFor(token, user.id)).toBeNull();
    token = rememberDevice(token, user.id);
    expect(await trustedDeviceFor(token, user.id)).toBe(deviceId);
  });

  it("ignores missing, tampered and other accounts' tokens", async () => {
    const { user } = await createUser({ roles: ["STUDENT"] });
    const token = rememberDevice(null, user.id);
    expect(await trustedDeviceFor(null, user.id)).toBeNull();
    expect(await trustedDeviceFor(`${token.slice(0, -2)}xx`, user.id)).toBeNull();
    expect(await trustedDeviceFor(token, uuid(999))).toBeNull();
  });

  it("stops trusting a device after 4 wrong passwords for the account", async () => {
    const { user } = await createUser({ roles: ["STUDENT"] });
    const token = rememberDevice(null, user.id);
    const deviceId = (await trustedDeviceFor(token, user.id))!;
    for (let i = 0; i < 3; i += 1) await countTrustedDeviceFailure(deviceId, user.id);
    expect(await trustedDeviceFor(token, user.id)).toBe(deviceId);
    await countTrustedDeviceFailure(deviceId, user.id);
    expect(await trustedDeviceFor(token, user.id)).toBeNull();
  });
});
