-- Create Workout Table
CREATE TABLE workout (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    userid INT NOT NULL, -- User ID associated with the workout
    username TEXT NOT NULL, -- Name of the user
    description TEXT NOT NULL, -- Description of the workout
    title TEXT NOT NULL, -- Title of the workout
    date DATE NOT NULL, -- Date of the workout
    duration NUMERIC NOT NULL, -- Duration in minutes or hours (adjust based on your use case)
    location TEXT NOT NULL, -- Location of the workout
    type TEXT NOT NULL, -- Type of workout (e.g., cardio, strength)
    createdAt TIMESTAMP DEFAULT NOW(), -- Auto-generated timestamp
    updatedAt TIMESTAMP DEFAULT NOW() -- Auto-updated timestamp
);

-- Trigger for auto-updating "updatedAt" in workout table
CREATE OR REPLACE FUNCTION update_updated_at_workout()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_workout
BEFORE UPDATE ON workout
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_workout();
