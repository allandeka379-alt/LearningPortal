import { chk, same, mdTable, parityBit, mod11CheckDigit, checksum8, toBase, pyBlock, py, group } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// ---- Validation routine (pseudocode) mirrored in Python; the output is from a real run.
export const validPseudo = `FUNCTION ValidMark(Text : STRING) RETURNS BOOLEAN
    DECLARE i : INTEGER
    DECLARE Value : INTEGER
    IF LENGTH(Text) = 0 OR LENGTH(Text) > 3 THEN     // presence and length checks
        RETURN FALSE
    ENDIF
    FOR i ← 1 TO LENGTH(Text)
        IF MID(Text, i, 1) < "0" OR MID(Text, i, 1) > "9" THEN     // digits only
            RETURN FALSE
        ENDIF
    NEXT i
    Value ← STR_TO_NUM(Text)
    RETURN Value >= 0 AND Value <= 100     // range check
ENDFUNCTION`;
export const validPy = `def valid_mark(text):
    if len(text) == 0 or len(text) > 3:
        return False
    for ch in text:
        if ch < "0" or ch > "9":
            return False
    return 0 <= int(text) <= 100


for item in ["67", "100", "0", "101", "", "6a", "-5", "1000"]:
    print(repr(item), valid_mark(item))`;
export const validRun = pyBlock(validPy);
same(validRun.text.split("\n"), ["'67' True", "'100' True", "'0' True", "'101' False", "'' False", "'6a' False", "'-5' False", "'1000' False"]);

// ---- Check digit (modulus 11, weights 7 6 5 4 3 2 for the first six digits, weight 1 for the check digit).
export const W = [7, 6, 5, 4, 3, 2];
export const id = "482915";
export const cd = mod11CheckDigit(id, W);
same(cd, { sum: 135, remainder: 3, check: "8" });
export const full = id + cd.check;
export const weightedTotal = (s) => s.split("").reduce((a, d, i) => a + Number(d) * [7, 6, 5, 4, 3, 2, 1][i], 0);
chk(weightedTotal(full), 143);
chk(weightedTotal(full) % 11, 0);
export const swapped = "4289158";
chk(weightedTotal(swapped), 137);
chk(weightedTotal(swapped) % 11, 5);

// ---- Block parity (even parity): four 7-bit characters, a parity bit on each row and a parity byte of the columns.
export const chars = ["K", "A", "D", "I"];
export const rows7 = chars.map((c) => toBase(c.charCodeAt(0), 2, 7));
export const rowsP = rows7.map((r) => r + parityBit(r, "even"));
export const colP = Array.from({ length: 8 }, (_, j) => parityBit(rowsP.map((r) => r[j]).join(""), "even")).join("");
export const blockMd = (rows, colRow) => mdTable(["Character", "Bit 7", "Bit 6", "Bit 5", "Bit 4", "Bit 3", "Bit 2", "Bit 1", "Parity bit"], [...rows.map((r, i) => [chars[i], ...r.split("")]), ["Parity byte", ...colRow.split("")]]);
export const blockSent = blockMd(rowsP, colP);
// One bit is flipped in transit: row 3 (D), bit 4.
export const rowsRecv = rowsP.map((r, i) => (i === 2 ? r.slice(0, 3) + (r[3] === "0" ? "1" : "0") + r.slice(4) : r));
export const rowCheck = rowsRecv.map((r) => (r.replace(/0/g, "").length % 2 === 0 ? "OK" : "error"));
export const colCheck = Array.from({ length: 8 }, (_, j) => (rowsRecv.map((r) => r[j]).join("") + colP[j]).replace(/0/g, "").length % 2 === 0 ? "OK" : "error");
export const blockRecv = blockMd(rowsRecv, colP);

// ---- Checksum example (different values from the privacy lesson)
export const cdata = [17, 244, 130, 91];
export const cchk = checksum8(cdata);
chk(cchk, 226);

if (process.argv[1]?.endsWith("w3a-validation-verification.mjs")) {
  console.log(validRun.output);
  console.log({ cd, full, rows7, rowsP, colP, rowCheck, colCheck, cchk });
  console.log(blockSent);
  console.log(blockRecv);
  needs("security/validation-verification", [validPseudo, validRun.code, validRun.output, blockSent, blockRecv, full, "= 135", "= 143", "= 137"]);
  console.log("lesson values OK");
}
