require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

/**
 * @typedef {import('../../Client/src/models/supabase').Database } WorkoutDatabase
 * @typedef {import('@supabase/supabase-js').SupabaseClient<WorkoutDatabase>} WorkoutClient
 */

module.exports = {
  /**
   * @returns {WorkoutClient}
   */
  getConnection() {
    return createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );
  },
};
