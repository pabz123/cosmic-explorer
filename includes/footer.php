    </main>

    <!-- Footer -->
    <footer class="site-footer" id="siteFooter">
        <div class="footer-content">
            <div class="footer-brand">
                <span class="logo-icon">🪐</span>
                <span class="logo-text">Cosmic Explorer</span>
                <p class="footer-tagline">Exploring the wonders of our solar system</p>
            </div>

            <div class="footer-links">
                <div class="footer-col">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="planets.php">All Planets</a></li>
                        <li><a href="compare.php">Compare</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Learn</h4>
                    <ul>
                        <li><a href="quiz.php">Solar Quiz</a></li>
                        <li><a href="planet.php?planet=earth">Earth</a></li>
                        <li><a href="planet.php?planet=mars">Mars</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="contact.php">Contact Us</a></li>
                        <li><a href="register.php">Sign Up</a></li>
                        <li><a href="login.php">Login</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Cosmic Explorer. Built for Web App Development Class.</p>
            <p class="footer-credit">Planet data sourced from NASA. Images generated with AI.</p>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="js/data.js"></script>
    <script src="js/main.js"></script>
    <?php if (isset($pageJS)): ?>
        <script src="js/<?php echo $pageJS; ?>"></script>
    <?php endif; ?>
</body>
</html>
