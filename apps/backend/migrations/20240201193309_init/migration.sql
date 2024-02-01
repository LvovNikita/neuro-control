-- CreateEnum
CREATE TYPE "ChildGenderType" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "QuestionTypeType" AS ENUM ('short', 'multipleChoice', 'checkboxes');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT,
    "email" TEXT NOT NULL DEFAULT '',
    "role" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "sysname" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "sysname" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "parent" UUID,
    "showInMenu" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" UUID NOT NULL,
    "user" UUID,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "dateOfBirth" DATE,
    "gender" "ChildGenderType",
    "medicalInfo" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "type" "QuestionTypeType",
    "answer" JSONB,
    "points" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" UUID NOT NULL,
    "test" UUID,
    "child" UUID,
    "date" DATE,
    "result" JSONB,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Role_permission" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Role_pages" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Parent_friends" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Child_testsResults" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Parent_children" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Test_questions" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Role_sysname_key" ON "Role"("sysname");

-- CreateIndex
CREATE INDEX "Permission_sysname_idx" ON "Permission"("sysname");

-- CreateIndex
CREATE INDEX "Page_parent_idx" ON "Page"("parent");

-- CreateIndex
CREATE INDEX "Parent_user_idx" ON "Parent"("user");

-- CreateIndex
CREATE INDEX "TestResult_test_idx" ON "TestResult"("test");

-- CreateIndex
CREATE INDEX "TestResult_child_idx" ON "TestResult"("child");

-- CreateIndex
CREATE UNIQUE INDEX "_Role_permission_AB_unique" ON "_Role_permission"("A", "B");

-- CreateIndex
CREATE INDEX "_Role_permission_B_index" ON "_Role_permission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Role_pages_AB_unique" ON "_Role_pages"("A", "B");

-- CreateIndex
CREATE INDEX "_Role_pages_B_index" ON "_Role_pages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Parent_friends_AB_unique" ON "_Parent_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_Parent_friends_B_index" ON "_Parent_friends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Child_testsResults_AB_unique" ON "_Child_testsResults"("A", "B");

-- CreateIndex
CREATE INDEX "_Child_testsResults_B_index" ON "_Child_testsResults"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Parent_children_AB_unique" ON "_Parent_children"("A", "B");

-- CreateIndex
CREATE INDEX "_Parent_children_B_index" ON "_Parent_children"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Test_questions_AB_unique" ON "_Test_questions"("A", "B");

-- CreateIndex
CREATE INDEX "_Test_questions_B_index" ON "_Test_questions"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_test_fkey" FOREIGN KEY ("test") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_child_fkey" FOREIGN KEY ("child") REFERENCES "Child"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Role_permission" ADD CONSTRAINT "_Role_permission_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Role_permission" ADD CONSTRAINT "_Role_permission_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Role_pages" ADD CONSTRAINT "_Role_pages_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Role_pages" ADD CONSTRAINT "_Role_pages_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent_friends" ADD CONSTRAINT "_Parent_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent_friends" ADD CONSTRAINT "_Parent_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Child_testsResults" ADD CONSTRAINT "_Child_testsResults_A_fkey" FOREIGN KEY ("A") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Child_testsResults" ADD CONSTRAINT "_Child_testsResults_B_fkey" FOREIGN KEY ("B") REFERENCES "TestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent_children" ADD CONSTRAINT "_Parent_children_A_fkey" FOREIGN KEY ("A") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent_children" ADD CONSTRAINT "_Parent_children_B_fkey" FOREIGN KEY ("B") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Test_questions" ADD CONSTRAINT "_Test_questions_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Test_questions" ADD CONSTRAINT "_Test_questions_B_fkey" FOREIGN KEY ("B") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;
