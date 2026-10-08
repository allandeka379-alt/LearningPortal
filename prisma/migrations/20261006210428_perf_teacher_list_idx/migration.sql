-- ===== Raw SQL (Prisma ignores partial indexes; no drift) =====
-- Plain CREATE INDEX IF NOT EXISTS: applied before launch while "User" is small. Added after launch, an index like this
-- would need CREATE INDEX CONCURRENTLY in its own single-statement migration.

-- Purpose: admin Users list filtered by role TEACHER and the Teachers list (cms/users/service.ts listUsers role filter,
-- listTeachers: roles @> '{TEACHER}' ORDER BY "createdAt" DESC, "id" DESC). Since 20261006203242_perf_indexes the
-- planner may answer a role filter by walking User_createdAt_id_idx backwards until one page of teachers is found;
-- teachers are a few percent of users and mostly older than the students they teach, so that walk read ~21k index
-- entries in the perf dataset (18-36 ms instead of 1.2 ms through the roles GIN index). This partial index holds only
-- teachers, in list order: one page = one short index range (0.14 ms). Rarer staff roles stay on User_roles_idx.
CREATE INDEX IF NOT EXISTS "User_teacher_createdAt_idx" ON "User" ("createdAt", "id") WHERE "roles" @> ARRAY['TEACHER']::"Role"[];
