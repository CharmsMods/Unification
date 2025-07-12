/**
 * Data Service Module
 * Handles all data fetching operations
 */

export const DataService = (() => {
  // Cache for storing fetched data
  const cache = {
    users: null,
    tools: null
  };

  /**
   * Fetch users data
   * @returns {Promise<Array>} Array of user objects
   */
  const fetchUsers = async () => {
    if (cache.users) {
      return cache.users;
    }

    try {
      const response = await fetch('/data/users.json');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      cache.users = await response.json();
      return cache.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  /**
   * Get user by ID
   * @param {string} userId - The ID of the user to find
   * @returns {Promise<Object|null>} User object or null if not found
   */
  const getUserById = async (userId) => {
    try {
      const users = await fetchUsers();
      return users.find(user => user.id === userId) || null;
    } catch (error) {
      console.error(`Error getting user ${userId}:`, error);
      return null;
    }
  };

  /**
   * Get all users
   * @returns {Promise<Array>} Array of all users
   */
  const getAllUsers = async () => {
    return fetchUsers();
  };

  return {
    getUserById,
    getAllUsers
  };
})();
