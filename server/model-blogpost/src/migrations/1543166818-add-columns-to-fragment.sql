ALTER TABLE fragments
ADD COLUMN source TEXT,
ADD COLUMN kind TEXT,
ADD COLUMN title TEXT,
ADD COLUMN presentation TEXT,
ADD COLUMN published BOOLEAN,
ADD COLUMN filtered TEXT;