document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should fade in on load
    const fadeElements = [
        document.querySelector('.hero-content h1'),
        document.querySelector('#user-selection-section h2'),
        document.querySelector('.member-buttons-container')
    ];
    
    // Add initial delay before starting animations
    setTimeout(() => {
        fadeElements.forEach((el, index) => {
            if (el) {
                // Add fade-in class with staggered delay
                setTimeout(() => {
                    el.classList.add('fade-in');
                }, 300 * index); // Increased delay between elements
            }
        });
    }, 500); // Initial delay before any animation starts
    
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
            background: 'charm.mp4',
            backgroundType: 'video' // Indicate this is a video background
        },
        { 
            id: 'user-inception', 
            name: 'Inception', 
            content: 'Inception explores deep ideas and cryptic messages. Dive into complex theories and mind-bending concepts.',
            background: 'inception.gif' // Changed to GIF for animated background
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
        
        // Remove any existing background elements
        const existingBg = document.getElementById('bg-overlay');
        if (existingBg) {
            existingBg.remove();
        }
        
        if (user.background) {
            const backgroundPath = `backgrounds/usersbackgrounds/${user.background}`;
            const isGif = user.background.toLowerCase().endsWith('.gif');
            const isVideo = user.backgroundType === 'video' || user.background.toLowerCase().endsWith('.mp4') || 
                           user.background.toLowerCase().endsWith('.webm');
            
            // Reset any previous background styles
            userContentSection.style.background = '';
            userContentSection.style.backgroundColor = '';
            
            // Create a container for the background
            const bgOverlay = document.createElement('div');
            bgOverlay.id = 'bg-overlay';
            bgOverlay.style.position = 'absolute';
            bgOverlay.style.top = '0';
            bgOverlay.style.left = '0';
            bgOverlay.style.width = '100%';
            bgOverlay.style.height = '100%';
            bgOverlay.style.zIndex = '-1';
            bgOverlay.style.overflow = 'hidden';
            
            if (isVideo) {
                console.log('Setting up video background:', backgroundPath);
                
                // For video backgrounds
                const video = document.createElement('video');
                video.id = 'user-video-bg';
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'auto';
                video.style.position = 'absolute';
                video.style.top = '50%';
                video.style.left = '50%';
                video.style.transform = 'translate(-50%, -50%)';
                video.style.minWidth = '100%';
                video.style.minHeight = '100%';
                video.style.objectFit = 'cover';
                
                // Add error handling
                video.onerror = function(e) {
                    console.error('Video error:', e);
                    console.error('Video error details:', video.error);
                    console.error('Video source:', backgroundPath);
                };
                
                video.onloadedmetadata = function() {
                    console.log('Video metadata loaded');
                    console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
                    console.log('Video duration:', video.duration);
                };
                
                video.oncanplay = function() {
                    console.log('Video can play');
                    video.play().catch(e => console.error('Play failed:', e));
                };
                
                // Add source for video
                const source = document.createElement('source');
                const fileExtension = user.background.split('.').pop().toLowerCase();
                const mimeType = fileExtension === 'webm' ? 'video/webm' : 'video/mp4';
                
                source.src = backgroundPath;
                source.type = mimeType;
                console.log('Setting video source:', {
                    src: source.src,
                    type: source.type,
                    fullPath: new URL(backgroundPath, window.location.href).href
                });
                
                // Clear any existing sources and add the new one
                video.innerHTML = '';
                video.appendChild(source);
                
                // Preload the next loop of the video to prevent hitches
                video.addEventListener('timeupdate', function() {
                    if (this.duration > 0 && this.currentTime > this.duration - 0.5) {
                        this.currentTime = 0;
                    }
                });
                
                // Add to DOM first
                bgOverlay.appendChild(video);
                
                // Try to play the video
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Autoplay was prevented:', error);
                        // Add a play button if autoplay is blocked
                        const playButton = document.createElement('div');
                        playButton.className = 'video-play-button';
                        playButton.innerHTML = '▶';
                        playButton.addEventListener('click', () => {
                            video.play().then(() => {
                                playButton.remove();
                            }).catch(e => {
                                console.error('Manual play failed:', e);
                                playButton.textContent = '❌ Click to try again';
                            });
                        });
                        bgOverlay.appendChild(playButton);
                    });
                }
                
                userContentSection.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                
                // Debug: Log video state after a short delay
                setTimeout(() => {
                    console.log('Video state after loading:', {
                        readyState: video.readyState,
                        networkState: video.networkState,
                        error: video.error,
                        currentSrc: video.currentSrc,
                        paused: video.paused,
                        ended: video.ended
                    });
                }, 1000);
                
            } else if (isGif) {
                // For GIFs
                const gif = document.createElement('div');
                gif.style.width = '100%';
                gif.style.height = '100%';
                gif.style.background = `url('${backgroundPath}') no-repeat center center`;
                gif.style.backgroundSize = 'cover';
                gif.style.opacity = '0.5';
                bgOverlay.appendChild(gif);
                userContentSection.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                
            } else {
                // For static images
                userContentSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundPath}') no-repeat center center`;
                userContentSection.style.backgroundSize = 'cover';
                return; // No need for additional overlay for static images
            }
            
            // Add the background overlay to the section
            userContentSection.insertBefore(bgOverlay, userContentSection.firstChild);
            userContentSection.style.position = 'relative';
            userContentSection.style.overflow = 'hidden';
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

        // Only scroll if this was triggered by a user click (not initial load)
        if (event && event.type === 'click') {
            userContentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Initial render of user cards
    renderUserCards();

    // Optionally, select the first user by default on page load
    if (users.length > 0) {
        selectUser(users[0]);
    }
});