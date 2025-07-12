/**
 * Tool Manager Module
 * Handles the tools section and tool-related functionality
 */

export const ToolManager = (() => {
  // DOM Elements
  let memberToolsContainer;
  let externalToolsContainer;
  
  // Tool data
  const memberTools = [
    {
      name: "AI Art Generator",
      description: "Create stunning AI-generated artwork with various styles and themes.",
      creator: "Charm?",
      url: "https://example.com/ai-art-generator",
      icon: "🎨"
    },
    {
      name: "Code Snippet Manager",
      description: "Organize and share your favorite code snippets with the community.",
      creator: "King_BowserxD",
      url: "https://example.com/code-snippets",
      icon: "💻"
    },
    {
      name: "Gaming Stats Tracker",
      description: "Track and analyze your gaming statistics across multiple platforms.",
      creator: "Inception",
      url: "https://example.com/gaming-stats",
      icon: "🎮"
    },
    {
      name: "Digital Art Portfolio",
      description: "Showcase your digital artwork with a beautiful portfolio.",
      creator: "Lisa061",
      url: "https://example.com/art-portfolio",
      icon: "🖌️"
    }
  ];

  const externalTools = [
    {
      name: "Discord Server",
      description: "Join our community Discord server to connect with other members.",
      url: "https://discord.gg/example",
      icon: "💬"
    },
    {
      name: "GitHub Organization",
      description: "Explore our open-source projects and contribute to the community.",
      url: "https://github.com/example",
      icon: "🐙"
    },
    {
      name: "Community Wiki",
      description: "Access our community knowledge base and documentation.",
      url: "https://example.com/wiki",
      icon: "📚"
    },
    {
      name: "Event Calendar",
      description: "Stay updated with upcoming community events and meetups.",
      url: "https://example.com/events",
      icon: "📅"
    }
  ];

  /**
   * Initialize the tool manager
   * @param {Object} elements - DOM elements needed for tool management
   */
  const init = (elements) => {
    // Store DOM references
    memberToolsContainer = elements.memberToolsContainer;
    externalToolsContainer = elements.externalToolsContainer;
    
    // Initialize tools
    renderTools();
  };
  
  /**
   * Render all tools
   */
  const renderTools = () => {
    renderToolSection(memberTools, memberToolsContainer, true);
    renderToolSection(externalTools, externalToolsContainer, false);
  };
  
  /**
   * Render a section of tools
   * @param {Array} tools - Array of tool objects
   * @param {HTMLElement} container - Container element to append tools to
   * @param {boolean} isMemberTool - Whether these are member-created tools
   */
  const renderToolSection = (tools, container, isMemberTool) => {
    if (!container) return;
    
    container.innerHTML = tools.map(tool => createToolCard(tool, isMemberTool)).join('');
  };
  
  /**
   * Create HTML for a tool card
   * @param {Object} tool - Tool data
   * @param {boolean} isMemberTool - Whether this is a member-created tool
   * @returns {string} HTML string for the tool card
   */
  const createToolCard = (tool, isMemberTool) => {
    return `
      <div class="tool-card fade-in">
        <div class="tool-header">
          <h3>${tool.icon || '🛠️'} ${tool.name}</h3>
          ${isMemberTool && tool.creator ? `<span class="tool-creator">by ${tool.creator}</span>` : ''}
        </div>
        <p class="tool-description">${tool.description}</p>
        <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
          ${isMemberTool ? 'Use Tool' : 'Visit'} →
        </a>
      </div>
    `;
  };
  
  // Public API
  return {
    init,
    renderTools
  };
})();
