document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for "Explore Members" button
    const exploreBtn = document.getElementById('explore-members-btn');
    const userSelectionSection = document.getElementById('user-selection-section');

    exploreBtn.addEventListener('click', () => {
        userSelectionSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Updated Dummy user data
    const users = [
        { id: 'user-kingbowserxd', name: 'King_BowserxD', content: 'Bowser is the king of the castle! Expect epic gaming highlights and maybe some villainous plans.' },
        { id: 'user-charm', name: 'Charm?', content: 'Charm shares cool tech and bio updates. Always up-to-date with the latest gadgets and trends.' },
        { id: 'user-inception', name: 'Inception', content: 'Inception explores deep ideas and cryptic messages. Dive into complex theories and mind-bending concepts.' },
        { id: 'user-nypd', name: 'NYPD', content: 'NYPD keeps an eye on the server and shares good vibes. Providing a sense of order and fun.' },
        { id: 'user-lisa061', name: 'Lisa061', content: 'Lisa is all about art and creativity. Discover beautiful illustrations and artistic projects.' },
        { id: 'user-lucky', name: 'Lucky?', content: 'Lucky shares fun stuff and good omens. Get your daily dose of good fortune and lighthearted content.' },
        { id: 'user-ydkaaron19', name: 'ydk_aaron19', content: 'Aaron is crowned for his contributions. A true leader sharing insights and wisdom.' },
        { id: 'user-jonath94k', name: 'jonath94k', content: 'Jonath brings unique perspectives. Explore different viewpoints and engaging discussions.' },
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

            userButtonP.addEventListener('click', () => selectUser(user));
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

        // --- Example of adding more content types (expand these as needed) ---
        // if (user.images && user.images.length > 0) {
        //     const imageGallery = document.createElement('div');
        //     imageGallery.classList.add('image-gallery');
        //     user.images.forEach(imgSrc => {
        //         const img = document.createElement('img');
        //         img.src = `img/${imgSrc}`;
        //         img.alt = `${user.name}'s image`;
        //         imageGallery.appendChild(img);
        //     });
        //     contentDiv.appendChild(imageGallery);
        // }

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