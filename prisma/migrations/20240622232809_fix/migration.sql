-- AddForeignKey
ALTER TABLE "ScoutNotes" ADD CONSTRAINT "ScoutNotes_scout_id_fkey" FOREIGN KEY ("scout_id") REFERENCES "UserScoutProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoutNotes" ADD CONSTRAINT "ScoutNotes_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "UserAthleteProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
