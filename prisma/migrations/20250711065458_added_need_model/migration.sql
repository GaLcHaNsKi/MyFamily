-- CreateTable
CREATE TABLE "Need" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3),
    "isConfirmed" BOOLEAN,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Need_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MemberToNeed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MemberToNeed_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MemberToNeed_B_index" ON "_MemberToNeed"("B");

-- AddForeignKey
ALTER TABLE "Need" ADD CONSTRAINT "Need_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToNeed" ADD CONSTRAINT "_MemberToNeed_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToNeed" ADD CONSTRAINT "_MemberToNeed_B_fkey" FOREIGN KEY ("B") REFERENCES "Need"("id") ON DELETE CASCADE ON UPDATE CASCADE;
