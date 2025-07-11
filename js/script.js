document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page
    const userSelectionSection = document.getElementById('user-selection-section');

    // Updated Dummy user data with background images
    const users = [
        { 
            id: 'user-kingbowserxd', 
            name: 'King_BowserxD', 
            content: 'Bowser is the king of the castle! Expect epic gaming highlights and maybe some villainous plans.',
            background: 'kingbowserxd.webp'
        },
        { 
            id: 'user-charm', 
            name: 'Charm?', 
            content: 'Charm shares cool tech and bio updates. Always up-to-date with the latest gadgets and trends.',
            background: 'charm.webp'
        },
        { 
            id: 'user-inception', 
            name: 'Inception', 
            content: 'Inception explores deep ideas and cryptic messages. Dive into complex theories and mind-bending concepts.',
            background: 'inception.webp'
        },
        { 
            id: 'user-nypd', 
            name: 'NYPD', 
            content: 'NYPD keeps an eye on the server and shares good vibes. Providing a sense of order and fun.',
            background: 'nypd.webp'
        },
        { 
            id: 'user-lisa061', 
            name: 'Lisa061', 
            content: 'Lisa is all about art and creativity. Discover beautiful illustrations and artistic projects.',
            background: 'lisa061.webp'
        },
        { 
            id: 'user-lucky', 
            name: 'Lucky?', 
            content: 'Lucky shares fun stuff and good omens. Get your daily dose of good fortune and lighthearted content.',
            background: 'lucky.webp'
        },
        { 
            id: 'user-ydkaaron19', 
            name: 'ydk_aaron19', 
            content: 'Aaron is crowned for his contributions. A true leader sharing insights and wisdom.',
            background: 'aaron19.webp'
        },
        { 
            id: 'user-jonath94k', 
            name: 'jonath94k', 
            content: 'Jonath brings unique perspectives. Explore different viewpoints and engaging discussions.',
            background: 'jonath94k.webp',
            social: {
                discord: '909792062386360320'
            }
        },
        // Add more users here if needed
        // { id: 'user-newguy', name: 'NewGuy', content: 'NewGuy is just getting started, but has great potential!' }
    ];

    const memberButtonsContainer = document.querySelector('.member-buttons-container'); // Updated selector
    const selectedUserNameSpan = document.getElementById('selected-user-name');
    const userContentArea = document.getElementById('user-content-area');
    const scrollHint = document.querySelector('.scroll-hint');

    // Function to render user buttons
    function renderUserCards() {
        memberButtonsContainer.innerHTML = ''; // Clear existing buttons
        users.forEach(user => {
            // Each user is now a single <p> element with the .user-button class
            const userButtonP = document.createElement('p');
            userButtonP.classList.add('user-button'); // Use the new class
            userButtonP.dataset.userId = user.id;

            const span = document.createElement('span');
            span.textContent = user.name; // Display user's name
            userButtonP.appendChild(span);

            userButtonP.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior
                selectUser(user);
            });
            memberButtonsContainer.appendChild(userButtonP);
        });

        // Show scroll hint if there are many users
        // This check needs to be more robust for flex-wrap.
        // For now, it will primarily check if the container overflows vertically.
        // A better check would involve comparing number of elements vs. screen width,
        // or just removing the hint if flex-wrap makes it always visible without scrolling.
        // For simplicity, we'll keep the basic scroll check.
        if (memberButtonsContainer.scrollHeight > memberButtonsContainer.clientHeight + 10) { // +10 for tolerance
            scrollHint.style.display = 'block';
        } else {
            scrollHint.style.display = 'none';
        }
    }

    // Function to select a user and display their content
    function selectUser(user) {
        // Remove 'active' class from all previously selected buttons
        document.querySelectorAll('.user-button').forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked user's button
        const clickedUserButton = document.querySelector(`.user-button[data-user-id="${user.id}"]`);
        
        // Set the user-specific background for the content section
        const userContentSection = document.getElementById('user-content-display-section');
        if (user.background) {
            const backgroundPath = `../backgrounds/usersbackgrounds/${user.background}`;
            userContentSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundPath}') no-repeat center center`;
            userContentSection.style.backgroundSize = 'cover';
        }
        if (clickedUserButton) {
            clickedUserButton.classList.add('active');
        }

        selectedUserNameSpan.textContent = user.name;
        userContentArea.innerHTML = ''; // Clear previous content

        // Dynamically load content based on user data
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('user-content-details'); // Add a class for styling

        const userDescription = document.createElement('p');
        userDescription.textContent = user.content;
        contentDiv.appendChild(userDescription);

        // Add social links if they exist
        if (user.social) {
            const socialLinks = document.createElement('div');
            socialLinks.classList.add('social-links');
            
            if (user.social.discord) {
                const discordLink = document.createElement('a');
                discordLink.href = `https://discord.com/users/${user.social.discord}`;
                discordLink.target = '_blank';
                discordLink.rel = 'noopener noreferrer';
                discordLink.innerHTML = '💬 Discord';
                discordLink.classList.add('social-link', 'discord');
                socialLinks.appendChild(discordLink);
            }
            
            if (user.social.github) {
                const githubLink = document.createElement('a');
                githubLink.href = user.social.github;
                githubLink.target = '_blank';
                githubLink.rel = 'noopener noreferrer';
                githubLink.innerHTML = '🐱 GitHub';
                githubLink.classList.add('social-link', 'github');
                socialLinks.appendChild(githubLink);
            }
            
            if (socialLinks.hasChildNodes()) {
                contentDiv.appendChild(document.createElement('br'));
                contentDiv.appendChild(socialLinks);
            }
        }

        userContentArea.appendChild(contentDiv);

        // Scroll down to the user content section
        userContentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Initial render of user cards
    renderUserCards();

    // Optionally, select the first user by default on page load
    if (users.length > 0) {
        selectUser(users[0]);
    }
});