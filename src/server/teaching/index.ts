/**
 * The teacher experience (§22) and the student-side class features. Server-only services; every function takes the
 * acting user and applies the resource rules of ./access (ARCHITECTURE §5.3) on top of the auth RBAC checks.
 *
 * - classes:        listTeacherClasses, getClassCreationOptions, createClass, updateClass, rotateJoinCode,
 *                   disableJoinCode, archiveClass, restoreClass, getClassRoster, approveJoinRequest,
 *                   declineJoinRequest, removeStudent, addCoTeacher, removeCoTeacher
 * - invitations:    addStudentsToClass, revokeClassInvitation (teacher); listMyClassInvitations, getClassInvitation,
 *                   acceptClassInvitation, declineClassInvitation (student)
 * - assignments:    getAssignmentFormOptions, createAssignment, publishAssignment, updateAssignmentSchedule,
 *                   closeAssignment, archiveAssignment, listClassAssignments, listTeacherAssignments,
 *                   getAssignmentDetail, excuseStudent, setStudentFeedback, assignTopicPractice; jobs
 *                   (registerTeachingJobs, closeAssignmentNow, closeDueAssignments, runAssignmentPublished)
 * - progress hooks: refreshAssignmentCounters, assignLiveWorkToMembers
 * - test builder:   getTestBuilderOptions, searchBuilderQuestions, createTeacherQuestion, createTeacherTest,
 *                   updateTeacherTest, publishTeacherTest, archiveTeacherTest, listTeacherTests, getTeacherTest,
 *                   listSubjectTopics, previewTeacherMarkdown
 * - marking:        listMarkingQueue, getAttemptForMarking, markAnswer
 * - analytics:      getClassPerformance, getClassTopicPerformance, getClassStudentPerformance
 * - announcements:  createClassAnnouncement, listClassAnnouncements, archiveClassAnnouncement, listTeacherAnnouncements
 * - dashboard:      getTeacherDashboard
 * - student side:   joinClassByCode, leaveClass, listMyClasses, listMyAssignments, getMyClass, startAssignmentWork
 */
export * from "./access";
export * from "./analytics";
export * from "./announcements";
export * from "./assignment-progress";
export * from "./assignments";
export * from "./classes";
export * from "./core";
export * from "./dashboard";
export * from "./invitations";
export * from "./marking";
export * from "./student";
export * from "./test-builder";
