<!-- Design System -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sign In | World Cup 2026 AI Predictor</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-panel {
            background: rgba(42, 47, 69, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(58, 63, 85, 0.5);
        }
        .stadium-glow {
            box-shadow: 0 0 50px rgba(245, 158, 11, 0.1);
        }
        input:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "inverse-on-surface": "#2a2f46",
                      "on-primary-container": "#613b00",
                      "surface-container-lowest": "#080d22",
                      "error": "#ffb4ab",
                      "surface-container-high": "#24293f",
                      "on-error-container": "#ffdad6",
                      "on-tertiary": "#003824",
                      "on-tertiary-fixed-variant": "#005236",
                      "surface-variant": "#2f344b",
                      "on-secondary-fixed-variant": "#004395",
                      "on-primary": "#472a00",
                      "primary": "#ffc174",
                      "surface": "#0d1227",
                      "secondary-fixed": "#d8e2ff",
                      "on-primary-fixed-variant": "#653e00",
                      "on-surface-variant": "#d8c3ad",
                      "secondary-fixed-dim": "#adc6ff",
                      "outline": "#a08e7a",
                      "tertiary": "#56e5a9",
                      "surface-container": "#191e34",
                      "surface-tint": "#ffb95f",
                      "inverse-surface": "#dde1ff",
                      "surface-bright": "#33384f",
                      "inverse-primary": "#855300",
                      "primary-fixed": "#ffddb8",
                      "on-secondary-container": "#e6ecff",
                      "on-error": "#690005",
                      "background": "#0d1227",
                      "outline-variant": "#534434",
                      "on-surface": "#dde1ff",
                      "secondary": "#adc6ff",
                      "tertiary-container": "#30c88f",
                      "tertiary-fixed": "#6ffbbe",
                      "on-background": "#dde1ff",
                      "tertiary-fixed-dim": "#4edea3",
                      "on-primary-fixed": "#2a1700",
                      "on-secondary-fixed": "#001a42",
                      "error-container": "#93000a",
                      "surface-container-low": "#151a30",
                      "surface-container-highest": "#2f344b",
                      "on-tertiary-fixed": "#002113",
                      "on-tertiary-container": "#004e34",
                      "secondary-container": "#0566d9",
                      "primary-container": "#f59e0b",
                      "primary-fixed-dim": "#ffb95f",
                      "on-secondary": "#002e6a",
                      "surface-dim": "#0d1227"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "gutter": "24px",
                      "xs": "4px",
                      "md": "16px",
                      "container-max": "1280px",
                      "sm": "8px",
                      "base": "4px",
                      "3xl": "64px",
                      "2xl": "48px",
                      "lg": "24px",
                      "xl": "32px"
              },
              "fontFamily": {
                      "headline-lg": ["Montserrat"],
                      "label-lg": ["Inter"],
                      "headline-md": ["Montserrat"],
                      "body-sm": ["Inter"],
                      "headline-sm": ["Montserrat"],
                      "body-lg": ["Inter"],
                      "label-md": ["Inter"],
                      "body-md": ["Inter"],
                      "display-md": ["Montserrat"],
                      "headline-lg-mobile": ["Montserrat"],
                      "display-lg": ["Montserrat"]
              },
              "fontSize": {
                      "headline-lg": ["30px", {"lineHeight": "38px", "fontWeight": "700"}],
                      "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "display-md": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                      "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}]
              }
            },
          },
        }
      </script>
</head>
<body class="bg-background text-on-surface min-h-screen flex flex-col font-body-md overflow-x-hidden">
<!-- Ambient Background Effect -->
<div class="fixed inset-0 z-0">

<div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
</div>
<!-- Layout Container (Navigation Suppressed for Login) -->
<main class="relative z-10 flex-grow flex items-center justify-center p-md">
<!-- Login Card -->
<div class="w-full max-w-[440px] stadium-glow glass-panel rounded-xl p-xl flex flex-col gap-xl">
<!-- Branding/Identity -->
<div class="flex flex-col items-center text-center gap-sm">
<div class="w-16 h-16 bg-primary-container text-on-primary-fixed rounded-full flex items-center justify-center mb-sm shadow-lg shadow-primary-container/20">
<span class="material-symbols-outlined text-[32px]">sports_soccer</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface">Sign In</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Enter your analyst credentials to continue.</p>
</div>
<!-- Form Section -->
<form action="#" class="flex flex-col gap-lg" method="POST">
<!-- Email/Username Input -->
<div class="flex flex-col gap-xs">
<label class="font-label-lg text-label-lg text-on-surface-variant" for="identity">Username/Email</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
<input class="w-full bg-surface-variant border-none rounded-lg py-md pl-[48px] pr-md text-on-surface font-body-md placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all duration-200" id="identity" name="identity" placeholder="analyst@worldcup2026.com" required="" type="text"/>
</div>
</div>
<!-- Password Input -->
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-center">
<label class="font-label-lg text-label-lg text-on-surface-variant" for="password">Password</label>
<a class="font-label-md text-label-md text-primary hover:text-primary-fixed-dim transition-colors" href="#">Forgot Password?</a>
</div>
<div class="relative group">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
<input class="w-full bg-surface-variant border-none rounded-lg py-md pl-[48px] pr-md text-on-surface font-body-md placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all duration-200" id="password" name="password" placeholder="••••••••" required="" type="password"/>
<button class="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" onclick="togglePassword()" type="button">
<span class="material-symbols-outlined" id="pw-toggle-icon">visibility</span>
</button>
</div>
</div>
<!-- Remember Me -->
<div class="flex items-center gap-sm">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-variant text-primary-container focus:ring-primary-container focus:ring-offset-background cursor-pointer" id="remember" name="remember" type="checkbox"/>
<label class="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none" for="remember">Remember Me</label>
</div>
<!-- CTA Button -->
<button class="w-full bg-primary-container hover:bg-primary text-on-primary-fixed font-headline-sm text-headline-sm py-md rounded-lg shadow-lg hover:shadow-primary-container/40 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-sm" type="submit">
                    Sign In
                    <span class="material-symbols-outlined">chevron_right</span>
</button>
</form>
<!-- Footer Section -->
<div class="flex flex-col items-center gap-md border-t border-outline-variant pt-lg">
<p class="font-body-sm text-body-sm text-on-surface-variant">
                    Don't have account? 
                    <a class="text-primary font-label-lg text-label-lg hover:underline underline-offset-4 ml-xs" href="#">Sign Up</a>
</p>
<div class="flex gap-lg opacity-60">
<a class="hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">help</span></a>
<a class="hover:text-primary transition-colors" href="#"><span class="material-symbols-outlined">security</span></a>
</div>
</div>
</div>
</main>
<!-- Footer Meta (Simplified for Auth) -->
<footer class="relative z-10 w-full py-lg">
<div class="max-w-container-max mx-auto px-lg flex flex-col items-center gap-sm">
<p class="font-body-sm text-body-sm text-on-surface-variant/50">© 2026 AI World Cup Predictor. FIFA World Cup is a trademark of FIFA.</p>
</div>
</footer>
<script>
        function togglePassword() {
            const input = document.getElementById('password');
            const icon = document.getElementById('pw-toggle-icon');
            if (input.type === 'password') {
                input.type = 'text';
                icon.innerText = 'visibility_off';
            } else {
                input.type = 'password';
                icon.innerText = 'visibility';
            }
        }

        // Simple button interaction
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Authenticating...';
            btn.classList.add('opacity-80', 'cursor-not-allowed');
            setTimeout(() => {
                window.location.href = '#dashboard'; // Mock redirection
            }, 1200);
        });
    </script>
</body></html>

<!-- Login - World Cup 2026 Predictor -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Register | ⚽ World Cup 2026</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-on-surface": "#2a2f46",
                    "on-primary-container": "#613b00",
                    "surface-container-lowest": "#080d22",
                    "error": "#ffb4ab",
                    "surface-container-high": "#24293f",
                    "on-error-container": "#ffdad6",
                    "on-tertiary": "#003824",
                    "on-tertiary-fixed-variant": "#005236",
                    "surface-variant": "#2f344b",
                    "on-secondary-fixed-variant": "#004395",
                    "on-primary": "#472a00",
                    "primary": "#ffc174",
                    "surface": "#0d1227",
                    "secondary-fixed": "#d8e2ff",
                    "on-primary-fixed-variant": "#653e00",
                    "on-surface-variant": "#d8c3ad",
                    "secondary-fixed-dim": "#adc6ff",
                    "outline": "#a08e7a",
                    "tertiary": "#56e5a9",
                    "surface-container": "#191e34",
                    "surface-tint": "#ffb95f",
                    "inverse-surface": "#dde1ff",
                    "surface-bright": "#33384f",
                    "inverse-primary": "#855300",
                    "primary-fixed": "#ffddb8",
                    "on-secondary-container": "#e6ecff",
                    "on-error": "#690005",
                    "background": "#0d1227",
                    "outline-variant": "#534434",
                    "on-surface": "#dde1ff",
                    "secondary": "#adc6ff",
                    "tertiary-container": "#30c88f",
                    "tertiary-fixed": "#6ffbbe",
                    "on-background": "#dde1ff",
                    "tertiary-fixed-dim": "#4edea3",
                    "on-primary-fixed": "#2a1700",
                    "on-secondary-fixed": "#001a42",
                    "error-container": "#93000a",
                    "surface-container-low": "#151a30",
                    "surface-container-highest": "#2f344b",
                    "on-tertiary-fixed": "#002113",
                    "on-tertiary-container": "#004e34",
                    "secondary-container": "#0566d9",
                    "primary-container": "#f59e0b",
                    "primary-fixed-dim": "#ffb95f",
                    "on-secondary": "#002e6a",
                    "surface-dim": "#0d1227"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "xs": "4px",
                    "md": "16px",
                    "container-max": "1280px",
                    "sm": "8px",
                    "base": "4px",
                    "3xl": "64px",
                    "2xl": "48px",
                    "lg": "24px",
                    "xl": "32px"
            },
            "fontFamily": {
                    "headline-lg": ["Montserrat"],
                    "label-lg": ["Inter"],
                    "headline-md": ["Montserrat"],
                    "body-sm": ["Inter"],
                    "headline-sm": ["Montserrat"],
                    "body-lg": ["Inter"],
                    "label-md": ["Inter"],
                    "body-md": ["Inter"],
                    "display-md": ["Montserrat"],
                    "headline-lg-mobile": ["Montserrat"],
                    "display-lg": ["Montserrat"]
            },
            "fontSize": {
                    "headline-lg": ["30px", {"lineHeight": "38px", "fontWeight": "700"}],
                    "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "display-md": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #0A0F1E;
            color: #dde1ff;
            font-family: 'Inter', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(42, 47, 69, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid #3A3F55;
        }
        .gold-glow {
            filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.3));
        }
        .gold-glow:hover {
            filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.5));
        }
    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
<!-- Background Atmosphere -->

<div class="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-[#0A0F1E] opacity-90 pointer-events-none"></div>
<!-- Registration Container -->
<main class="w-full max-w-md px-md py-3xl z-10">
<!-- Brand Identity -->
<div class="flex flex-col items-center mb-xl">
<div class="w-16 h-16 mb-md flex items-center justify-center bg-primary-container rounded-xl gold-glow">
<span class="material-symbols-outlined text-on-primary-container text-[40px]" style="font-variation-settings: 'FILL' 1;">sports_soccer</span>
</div>
<h1 class="font-headline-md text-headline-md text-primary tracking-tight">World Cup 2026</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant opacity-70">Predict the Glory. Join the Elite.</p>
</div>
<!-- Progress Indicator -->
<div class="mb-lg px-xs">
<div class="flex justify-between items-end mb-sm">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Step 1 of 2</span>
<span class="font-label-md text-label-md text-primary">Personal Details</span>
</div>
<div class="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-primary-container w-1/2 transition-all duration-500 ease-out"></div>
</div>
</div>
<!-- Registration Card -->
<section class="glass-card rounded-xl p-lg md:p-xl shadow-2xl">
<div class="mb-xl">
<h2 class="font-headline-sm text-headline-sm text-on-surface">Create Account</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">Start your journey as a pro analyst today.</p>
</div>
<form action="#" class="space-y-lg" method="POST">
<!-- Username -->
<div class="space-y-xs">
<label class="font-label-lg text-label-lg text-on-surface-variant" for="username">Username</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
<input class="w-full bg-surface-variant border-none rounded-lg py-md pl-10 pr-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all" id="username" name="username" placeholder="pro_analyst_26" type="text"/>
</div>
</div>
<!-- Email -->
<div class="space-y-xs">
<label class="font-label-lg text-label-lg text-on-surface-variant" for="email">Email Address</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
<input class="w-full bg-surface-variant border-none rounded-lg py-md pl-10 pr-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all" id="email" name="email" placeholder="name@stadium.com" type="email"/>
</div>
</div>
<!-- Password Row -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-md">
<div class="space-y-xs">
<label class="font-label-lg text-label-lg text-on-surface-variant" for="password">Password</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
<input class="w-full bg-surface-variant border-none rounded-lg py-md pl-10 pr-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all" id="password" name="password" placeholder="••••••••" type="password"/>
</div>
</div>
<div class="space-y-xs">
<label class="font-label-lg text-label-lg text-on-surface-variant" for="confirm_password">Confirm</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">verified_user</span>
<input class="w-full bg-surface-variant border-none rounded-lg py-md pl-10 pr-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container transition-all" id="confirm_password" name="confirm_password" placeholder="••••••••" type="password"/>
</div>
</div>
</div>
<!-- T&C Checkbox -->
<div class="flex items-start gap-md pt-sm">
<div class="relative flex items-center h-5">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-variant text-primary-container focus:ring-primary focus:ring-offset-0 focus:ring-offset-surface" id="terms" name="terms" type="checkbox"/>
</div>
<label class="font-body-sm text-body-sm text-on-surface-variant" for="terms">
                        I agree to the <a class="text-primary hover:underline transition-all" href="#">Terms of Service</a> and <a class="text-primary hover:underline transition-all" href="#">Privacy Policy</a> regarding my data.
                    </label>
</div>
<!-- Primary Action -->
<button class="w-full bg-primary-container text-on-primary-fixed font-label-lg text-label-lg py-md px-lg rounded-lg gold-glow hover:bg-[#FCD34D] transition-all active:scale-95 flex items-center justify-center gap-sm" type="submit">
                    Create Account
                    <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</form>
<!-- Footer Link -->
<div class="mt-xl text-center border-t border-outline-variant pt-lg">
<p class="font-body-sm text-body-sm text-on-surface-variant">
                    Already registered? 
                    <a class="text-primary font-label-lg text-label-lg ml-xs hover:underline transition-all" href="/auth/login">Sign In</a>
</p>
</div>
</section>
<!-- Technical Metadata -->
<div class="mt-xl text-center">
<p class="font-label-md text-label-md text-on-surface-variant opacity-40 uppercase tracking-[0.2em]">Secure Encryption Active • Pro Analyst API v2.6</p>
</div>
</main>
<!-- Background Decoration Image -->
<div class="fixed bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-20 hidden lg:block">
<div class="w-full h-full bg-contain bg-no-repeat bg-bottom" data-alt="A highly detailed cinematic shot of the official 2026 World Cup trophy rendered in high-contrast gold lighting. The background is a dark, nocturnal stadium atmosphere with subtle blue and purple volumetric lighting. The trophy reflects the surrounding ambient stadium lights, looking prestigious and metallic. The style is hyper-realistic and sports-commercial." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKXA3VVvG-C-bnSHReMtoeDGxb_u-LfXtfzs7rkYDJOV75a5MPsmcCYVVOufhHQlAUo60cQ0qrZDTlsfjNLD-Keu4LmgyDkBlJ_JVhvXeJMtQMgtvAsYN0fvAVFmX_DsS7RMEIumSzhgNYd-i3S7tIwcRjVyLol_HBMyp7WjrfH83SyscAdRk_uokK035KX2fskpPKF6n5hCq_k9qW20OB9YFlDqeWNozZx87a_bT7TF1wRysXkINStIkRGuo9uyBPvA5uiBH5ugM')"></div>
</div>
<!-- Script for micro-interactions -->
<script>
        // Simple input focus effects and validation visual feedback
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', () => {
                const parent = input.closest('.relative');
                if (parent) parent.style.transform = 'translateY(-2px)';
            });
            input.addEventListener('blur', () => {
                const parent = input.closest('.relative');
                if (parent) parent.style.transform = 'translateY(0)';
            });
        });

        // Form submission animation mock
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                alert('In a real app, this would advance to Step 2: Preference Selection.');
            }, 1500);
        });
    </script>
</body></html>

<!-- Register - World Cup 2026 Predictor -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Match Predictor | World Cup 2026</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .glass-card {
            background: rgba(42, 47, 69, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(58, 63, 85, 1);
        }
        .match-card-hover:hover {
            border-color: #f59e0b;
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        .prediction-bar-segment {
            transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "inverse-on-surface": "#2a2f46",
                      "on-primary-container": "#613b00",
                      "surface-container-lowest": "#080d22",
                      "error": "#ffb4ab",
                      "surface-container-high": "#24293f",
                      "on-error-container": "#ffdad6",
                      "on-tertiary": "#003824",
                      "on-tertiary-fixed-variant": "#005236",
                      "surface-variant": "#2f344b",
                      "on-secondary-fixed-variant": "#004395",
                      "on-primary": "#472a00",
                      "primary": "#ffc174",
                      "surface": "#0d1227",
                      "secondary-fixed": "#d8e2ff",
                      "on-primary-fixed-variant": "#653e00",
                      "on-surface-variant": "#d8c3ad",
                      "secondary-fixed-dim": "#adc6ff",
                      "outline": "#a08e7a",
                      "tertiary": "#56e5a9",
                      "surface-container": "#191e34",
                      "surface-tint": "#ffb95f",
                      "inverse-surface": "#dde1ff",
                      "surface-bright": "#33384f",
                      "inverse-primary": "#855300",
                      "primary-fixed": "#ffddb8",
                      "on-secondary-container": "#e6ecff",
                      "on-error": "#690005",
                      "background": "#0d1227",
                      "outline-variant": "#534434",
                      "on-surface": "#dde1ff",
                      "secondary": "#adc6ff",
                      "tertiary-container": "#30c88f",
                      "tertiary-fixed": "#6ffbbe",
                      "on-background": "#dde1ff",
                      "tertiary-fixed-dim": "#4edea3",
                      "on-primary-fixed": "#2a1700",
                      "on-secondary-fixed": "#001a42",
                      "error-container": "#93000a",
                      "surface-container-low": "#151a30",
                      "surface-container-highest": "#2f344b",
                      "on-tertiary-fixed": "#002113",
                      "on-tertiary-container": "#004e34",
                      "secondary-container": "#0566d9",
                      "primary-container": "#f59e0b",
                      "primary-fixed-dim": "#ffb95f",
                      "on-secondary": "#002e6a",
                      "surface-dim": "#0d1227"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "gutter": "24px",
                      "xs": "4px",
                      "md": "16px",
                      "container-max": "1280px",
                      "sm": "8px",
                      "base": "4px",
                      "3xl": "64px",
                      "2xl": "48px",
                      "lg": "24px",
                      "xl": "32px"
              },
              "fontFamily": {
                      "headline-lg": ["Montserrat"],
                      "label-lg": ["Inter"],
                      "headline-md": ["Montserrat"],
                      "body-sm": ["Inter"],
                      "headline-sm": ["Montserrat"],
                      "body-lg": ["Inter"],
                      "label-md": ["Inter"],
                      "body-md": ["Inter"],
                      "display-md": ["Montserrat"],
                      "headline-lg-mobile": ["Montserrat"],
                      "display-lg": ["Montserrat"]
              },
              "fontSize": {
                      "headline-lg": ["30px", {"lineHeight": "38px", "fontWeight": "700"}],
                      "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                      "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "display-md": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                      "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                      "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}]
              }
            },
          },
        }
    </script>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen">
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 z-50 bg-surface-container-highest dark:bg-surface-container-highest border-b border-outline-variant shadow-sm flex justify-between items-center px-lg">
<div class="flex items-center gap-md">
<span class="font-headline-md text-headline-md text-primary dark:text-primary">⚽ World Cup 2026</span>
</div>
<div class="flex items-center gap-md">
<div class="cursor-pointer active:opacity-80">
<span class="material-symbols-outlined text-primary" data-icon="logout">logout</span>
</div>
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A professional user profile avatar in a minimalist circles, featuring a high-contrast cinematic portrait of a sophisticated data analyst. The lighting is dramatic and nocturnal, with subtle golden highlights reflecting the premium brand identity. The background is a deep navy void, maintaining a sleek, corporate tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_z__7CkU2V0FcxLGbWxXs8d4H0R1bL3TpJg7XUv2OzYIJeeZ_WN3rQnquyBtUOucrt1FjSusuuF8__PIWgNlV3mVm1y2siPcyssQsc1Xj4u_FJoTqNEExESirMAJ9EAeBUAxgjmzG4NoxO_iJB1jdNt_MvN3UxLgLtXTE30w98iA5FuLp42NJCmS8VETB50RDsGi_OdvR5T5m-Jp-ESxBGkquhY9L0JW3_KoY9Bi7FaQketqJFty0LxeeOWL3CLFwzELLz5TH77w"/>
</div>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-surface-container-low dark:bg-surface-container-low border-r border-outline-variant flex flex-col p-md gap-sm">
<div class="mb-lg px-sm">
<div class="text-primary font-headline-sm text-headline-sm">Pro Analyst</div>
<div class="text-on-surface-variant font-body-md text-body-md">Premium Tier</div>
</div>
<nav class="flex flex-col gap-xs flex-grow">
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-lg text-label-lg">Dashboard</span>
</a>
<a class="flex items-center gap-md p-md bg-primary-container text-on-primary-container rounded-lg font-bold transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span class="font-label-lg text-label-lg">Match Predictor</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="sports_soccer">sports_soccer</span>
<span class="font-label-lg text-label-lg">Golden Boot</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="front_hand">front_hand</span>
<span class="font-label-lg text-label-lg">Golden Glove</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="psychology">psychology</span>
<span class="font-label-lg text-label-lg">Match Simulator</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined" data-icon="trophy">trophy</span>
<span class="font-label-lg text-label-lg">Tournament Simulator</span>
</a>
</nav>
</aside>
<!-- Main Content -->
<main class="ml-64 mt-16 p-lg max-w-container-max mx-auto relative min-h-[calc(100vh-64px)]">
<!-- Header Section -->
<header class="mb-2xl flex justify-between items-end">
<div>
<h1 class="font-headline-lg text-headline-lg text-primary mb-xs">Match Predictor</h1>
<p class="text-on-surface-variant font-body-md">Leverage AI analytics to submit your tournament predictions.</p>
</div>
<div class="flex items-center gap-md bg-surface-container-high px-md py-sm rounded-lg border border-outline-variant">
<span class="material-symbols-outlined text-primary" data-icon="verified">verified</span>
<span class="font-label-lg text-label-lg">Top 2% Predictor Rank</span>
</div>
</header>
<!-- Filter Section -->
<section class="mb-2xl">
<div class="glass-card p-xl rounded-xl grid grid-cols-1 md:grid-cols-4 gap-lg items-end">
<div class="flex flex-col gap-xs">
<label class="font-label-md text-label-md text-on-surface-variant">Search Teams</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
<input class="w-full pl-10 pr-md py-sm bg-surface-variant border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant" placeholder="e.g. Mexico" type="text"/>
</div>
</div>
<div class="flex flex-col gap-xs">
<label class="font-label-md text-label-md text-on-surface-variant">Stage</label>
<select class="w-full px-md py-sm bg-surface-variant border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface">
<option>Group Stage</option>
<option>Round of 32</option>
<option>Round of 16</option>
<option>Quarter Finals</option>
</select>
</div>
<div class="flex flex-col gap-xs">
<label class="font-label-md text-label-md text-on-surface-variant">Group</label>
<select class="w-full px-md py-sm bg-surface-variant border-none rounded-lg focus:ring-2 focus:ring-primary text-on-surface">
<option>All Groups</option>
<option>Group A</option>
<option>Group B</option>
<option>Group C</option>
</select>
</div>
<div class="flex items-center justify-between px-md py-sm bg-surface-container-high rounded-lg border border-outline-variant">
<span class="text-on-surface-variant font-label-md">Total Matches</span>
<span class="font-headline-sm text-primary">48</span>
</div>
</div>
</section>
<!-- Match Cards Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
<!-- Match Card 1: MEX vs RSA -->
<div class="glass-card rounded-xl p-lg flex flex-col gap-lg match-card-hover transition-all duration-300">
<!-- Header -->
<div class="flex justify-between items-center pb-md border-b border-outline-variant">
<span class="font-label-md text-label-md text-primary uppercase tracking-widest">Group A • Match #1</span>
<span class="text-on-surface-variant material-symbols-outlined" data-icon="info">info</span>
</div>
<!-- Teams Display -->
<div class="flex justify-between items-center py-md">
<div class="flex flex-col items-center gap-sm w-24">
<div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant overflow-hidden">
<img class="w-12 h-12 object-contain" data-alt="A stylized, high-fidelity national team crest for Mexico, featuring a powerful eagle and snake emblem in deep green, white, and red. The aesthetic is clean and modern-corporate, set against a dark, metallic background with professional studio lighting and gold edge highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtzI5iu5yQvMgUsjOTDH4DPx4FoTqWEGs3VILU9tyfJjeSIlw5fvmZmqfmCMhK0mYo2jeAXbUDEJaEVBoLTy0kAi2IQWn8J5TbNK_8fw1uOYE8FQIInZoJ4aFPoKOFokSY7DdeCuyWC5JCsfkvEHFUO8KakRKo2EUJ8ylmd5cmaYGoE02sZ8kOOzLt64KFB_s7RLNWr6MSfDh-lqiBUtjZPkOiWC6NMoPYOYQok3nh0AfkigMWqFpncBgI3GUxDhyocDF0AHzKn2o"/>
</div>
<span class="font-headline-sm text-headline-sm">MEX</span>
</div>
<div class="flex flex-col items-center">
<span class="text-primary font-display-md text-display-md italic opacity-20">VS</span>
<span class="font-label-md text-on-surface-variant">LIVE ODDS</span>
</div>
<div class="flex flex-col items-center gap-sm w-24">
<div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant overflow-hidden">
<img class="w-12 h-12 object-contain" data-alt="A stylized, high-fidelity national team crest for South Africa, featuring the vibrant Protea flower and geometric patterns in green, yellow, and blue. The aesthetic is clean and modern-corporate, set against a dark, metallic background with professional studio lighting and gold edge highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuClCJQfxo4YFZuAaDAQsjPTGQO89GeNn4FX9pMuYJT_2GLuPk0T5qvY1I0Pi0z2PSv4eI104PLNXULunv-GGNDDDkkh-2AgSqyZX52BXL7FlW9krWJwnAEE04Yy2uCv2DgCa4T7ctf9ONUgg5vuhAKpY1peh2TVCZ4OFL68V9PcFdzh95dfS1zBw7uKhg6l8egUqxwGWDtrwydR5ZkvWMUP_hF34tWs8Apjkcx3-zzHPgXaDokyj_0KaW7eozCQ0poBectfME461uI"/>
</div>
<span class="font-headline-sm text-headline-sm">RSA</span>
</div>
</div>
<!-- Date/Venue -->
<div class="flex items-center justify-center gap-md text-on-surface-variant font-label-md">
<span class="material-symbols-outlined text-[16px]" data-icon="calendar_today">calendar_today</span>
<span>Jun 11, 2026 • Los Angeles</span>
</div>
<!-- AI Prediction Bar -->
<div class="space-y-sm">
<div class="flex justify-between text-label-md text-on-surface-variant uppercase tracking-tighter">
<span>Win 42%</span>
<span>Draw 28%</span>
<span>Win 30%</span>
</div>
<div class="h-2 w-full rounded-full overflow-hidden flex bg-surface-variant">
<div class="h-full bg-primary" style="width: 42%"></div>
<div class="h-full bg-on-surface-variant/30" style="width: 28%"></div>
<div class="h-full bg-secondary" style="width: 30%"></div>
</div>
<p class="text-center text-label-md font-medium text-primary">AI Recommendation: Home Win (2-1)</p>
</div>
<!-- Prediction Inputs -->
<div class="flex items-center justify-center gap-lg bg-surface-container-low p-md rounded-lg">
<div class="flex items-center gap-sm">
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.nextElementSibling.stepDown()">-</button>
<input class="w-12 h-12 bg-surface text-center font-headline-md text-headline-md border-2 border-outline-variant rounded-lg focus:border-primary focus:ring-0" max="15" min="0" type="number" value="0"/>
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.previousElementSibling.stepUp()">+</button>
</div>
<div class="w-px h-10 bg-outline-variant"></div>
<div class="flex items-center gap-sm">
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.nextElementSibling.stepDown()">-</button>
<input class="w-12 h-12 bg-surface text-center font-headline-md text-headline-md border-2 border-outline-variant rounded-lg focus:border-primary focus:ring-0" max="15" min="0" type="number" value="0"/>
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.previousElementSibling.stepUp()">+</button>
</div>
</div>
<!-- CTA -->
<button class="w-full py-md bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
<span class="material-symbols-outlined" data-icon="send">send</span>
                    Submit Prediction
                </button>
</div>
<!-- Match Card 2: USA vs WAL -->
<div class="glass-card rounded-xl p-lg flex flex-col gap-lg match-card-hover transition-all duration-300">
<div class="flex justify-between items-center pb-md border-b border-outline-variant">
<span class="font-label-md text-label-md text-primary uppercase tracking-widest">Group B • Match #2</span>
<span class="text-on-surface-variant material-symbols-outlined" data-icon="info">info</span>
</div>
<div class="flex justify-between items-center py-md">
<div class="flex flex-col items-center gap-sm w-24">
<div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant overflow-hidden">
<img class="w-12 h-12 object-contain" data-alt="A stylized, high-fidelity national team crest for USA, featuring a shield with stars and stripes in navy, red, and white. The aesthetic is clean and modern-corporate, set against a dark, metallic background with professional studio lighting and gold edge highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXbywzNw_goZezjPBD1H3bvbuEpg8o6cM2UzfqmfGLndXn6abzwRM7xeo4qn-YWhbv3PB2yKF1j2W1sO_xWt4FypUeNp-0bCmcOH-dBb--ZqIlJE2lBd8xO81MyNe1Kb0inDR6SXJR6UBlqh2BApGLWK59v0Jh_kj4GUF03djZLPdOfq-cysVO9PFfGWdUp0UhXiKjva_94uhTVPNcaKrC3-ZPh8x-haIPHrQyRh0B6X_q6Vl6wSGhbRi4IQ48-GyxG-qkU79oV2o"/>
</div>
<span class="font-headline-sm text-headline-sm">USA</span>
</div>
<div class="flex flex-col items-center">
<span class="text-primary font-display-md text-display-md italic opacity-20">VS</span>
<span class="font-label-md text-on-surface-variant">LIVE ODDS</span>
</div>
<div class="flex flex-col items-center gap-sm w-24">
<div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant overflow-hidden">
<img class="w-12 h-12 object-contain" data-alt="A stylized, high-fidelity national team crest for Wales, featuring the iconic red dragon on a green and white background. The aesthetic is clean and modern-corporate, set against a dark, metallic background with professional studio lighting and gold edge highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-QzWjeoUK-fht5MgKW4njawJLj5d6cakBc5wg2zu3jbj1bcrxNMsunEBk4E2PLGEa4KRVjQTqeX4DkuOVpIyk3M-8KKyCZ_QqGuSIZXuIIAeL1EERaJCaspZcJ-Zdi59ccjba40BlKSaLzKut8xC7W9hDBfos1VVgY-cPNWSFu4LJzycxZUNPQc2NoDW49gNXQPmbvCMYzStYjwfG_CMXocsToMACCbnZixwqapnybP0ixdUixC7maCdBodSoRaHJ1SzDJzONYUI"/>
</div>
<span class="font-headline-sm text-headline-sm">WAL</span>
</div>
</div>
<div class="flex items-center justify-center gap-md text-on-surface-variant font-label-md">
<span class="material-symbols-outlined text-[16px]" data-icon="calendar_today">calendar_today</span>
<span>Jun 12, 2026 • New York</span>
</div>
<div class="space-y-sm">
<div class="flex justify-between text-label-md text-on-surface-variant uppercase tracking-tighter">
<span>Win 55%</span>
<span>Draw 20%</span>
<span>Win 25%</span>
</div>
<div class="h-2 w-full rounded-full overflow-hidden flex bg-surface-variant">
<div class="h-full bg-primary" style="width: 55%"></div>
<div class="h-full bg-on-surface-variant/30" style="width: 20%"></div>
<div class="h-full bg-secondary" style="width: 25%"></div>
</div>
<p class="text-center text-label-md font-medium text-primary">AI Recommendation: Home Win (3-0)</p>
</div>
<div class="flex items-center justify-center gap-lg bg-surface-container-low p-md rounded-lg">
<div class="flex items-center gap-sm">
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.nextElementSibling.stepDown()">-</button>
<input class="w-12 h-12 bg-surface text-center font-headline-md text-headline-md border-2 border-outline-variant rounded-lg focus:border-primary focus:ring-0" max="15" min="0" type="number" value="1"/>
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.previousElementSibling.stepUp()">+</button>
</div>
<div class="w-px h-10 bg-outline-variant"></div>
<div class="flex items-center gap-sm">
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.nextElementSibling.stepDown()">-</button>
<input class="w-12 h-12 bg-surface text-center font-headline-md text-headline-md border-2 border-outline-variant rounded-lg focus:border-primary focus:ring-0" max="15" min="0" type="number" value="1"/>
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.previousElementSibling.stepUp()">+</button>
</div>
</div>
<button class="w-full py-md bg-surface-variant text-on-surface-variant font-label-lg text-label-lg rounded-lg font-bold opacity-50 cursor-not-allowed flex items-center justify-center gap-md">
<span class="material-symbols-outlined" data-icon="check_circle">check_circle</span>
                    Prediction Saved
                </button>
</div>
<!-- Match Card 3: ARG vs KSA -->
<div class="glass-card rounded-xl p-lg flex flex-col gap-lg match-card-hover transition-all duration-300">
<div class="flex justify-between items-center pb-md border-b border-outline-variant">
<span class="font-label-md text-label-md text-primary uppercase tracking-widest">Group C • Match #3</span>
<span class="text-on-surface-variant material-symbols-outlined" data-icon="info">info</span>
</div>
<div class="flex justify-between items-center py-md">
<div class="flex flex-col items-center gap-sm w-24">
<div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant overflow-hidden">
<img class="w-12 h-12 object-contain" data-alt="A stylized, high-fidelity national team crest for Argentina, featuring the sun and blue stripes. The aesthetic is clean and modern-corporate, set against a dark, metallic background with professional studio lighting and gold edge highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdrdmYCHEt3S45A2oc6j8VN1rkvYQvjSiVHqiUAtljcDecHJ-KWVDBi512gaaT48sGnhuNzzSUqTpK0f5YSxTWm51TfRS8UD8n7Gfw4nLWXGWqEOMXkZUtphQzUvjj0xGbV8QB3S9NPRUFzO5fmGQ7wssohIaMdnvGV3DCEuvhI1fGVFPynf4KGDWM2wZtSges85p2eYMzBXOZGmjVekABF-K0Dq59oQFh98-5cNvvMemVUZNgvgBjKUQR-kz6bDyUPpkWhfRjXC4"/>
</div>
<span class="font-headline-sm text-headline-sm">ARG</span>
</div>
<div class="flex flex-col items-center">
<span class="text-primary font-display-md text-display-md italic opacity-20">VS</span>
<span class="font-label-md text-on-surface-variant">LIVE ODDS</span>
</div>
<div class="flex flex-col items-center gap-sm w-24">
<div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border-2 border-outline-variant overflow-hidden">
<img class="w-12 h-12 object-contain" data-alt="A stylized, high-fidelity national team crest for Saudi Arabia, featuring a green shield with a palm tree and crossed swords. The aesthetic is clean and modern-corporate, set against a dark, metallic background with professional studio lighting and gold edge highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKhOIv46-1DtA9tkNBey7ipeUIAlGfX9QELBSouLalRH_G0r0XNiOGZoJjOlF6MXfcbnLpJmplGFld5wefhu_9IkE9unWd36IL3FCT83pP7fXtZ1mZ8MnGb2GgDDt063FB7umdnQR3EP3Zxp4hJMCCzVS8JMijZAot4c_n8S8CHLg6KtPAt_KKjTFyhNJQpqb3zoColamaGV8Sj3rqRdLTAk3_K2I_XdgSmG8w13sMc-wv0YEliiaYJsUcgL9MKr7ozcQoGUptqs4"/>
</div>
<span class="font-headline-sm text-headline-sm">KSA</span>
</div>
</div>
<div class="flex items-center justify-center gap-md text-on-surface-variant font-label-md">
<span class="material-symbols-outlined text-[16px]" data-icon="calendar_today">calendar_today</span>
<span>Jun 13, 2026 • Dallas</span>
</div>
<div class="space-y-sm">
<div class="flex justify-between text-label-md text-on-surface-variant uppercase tracking-tighter">
<span>Win 78%</span>
<span>Draw 15%</span>
<span>Win 7%</span>
</div>
<div class="h-2 w-full rounded-full overflow-hidden flex bg-surface-variant">
<div class="h-full bg-primary" style="width: 78%"></div>
<div class="h-full bg-on-surface-variant/30" style="width: 15%"></div>
<div class="h-full bg-secondary" style="width: 7%"></div>
</div>
<p class="text-center text-label-md font-medium text-primary">AI Recommendation: Home Win (4-0)</p>
</div>
<div class="flex items-center justify-center gap-lg bg-surface-container-low p-md rounded-lg">
<div class="flex items-center gap-sm">
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.nextElementSibling.stepDown()">-</button>
<input class="w-12 h-12 bg-surface text-center font-headline-md text-headline-md border-2 border-outline-variant rounded-lg focus:border-primary focus:ring-0" max="15" min="0" type="number" value="0"/>
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.previousElementSibling.stepUp()">+</button>
</div>
<div class="w-px h-10 bg-outline-variant"></div>
<div class="flex items-center gap-sm">
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.nextElementSibling.stepDown()">-</button>
<input class="w-12 h-12 bg-surface text-center font-headline-md text-headline-md border-2 border-outline-variant rounded-lg focus:border-primary focus:ring-0" max="15" min="0" type="number" value="0"/>
<button class="w-8 h-8 flex items-center justify-center rounded bg-surface-variant hover:bg-outline-variant transition-colors text-primary" onclick="this.previousElementSibling.stepUp()">+</button>
</div>
</div>
<button class="w-full py-md bg-primary-container text-on-primary-container font-label-lg text-label-lg rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
<span class="material-symbols-outlined" data-icon="send">send</span>
                    Submit Prediction
                </button>
</div>
</section>
<!-- Floating Analytics Panel Toggle -->
<div class="fixed bottom-lg right-lg z-40">
<button class="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
<span class="material-symbols-outlined" data-icon="bolt">bolt</span>
</button>
</div>
</main>
<!-- Footer -->
<footer class="ml-64 w-[calc(100%-16rem)] py-xl bg-surface-container-lowest border-t border-outline-variant">
<div class="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-lg">
<div class="font-headline-sm text-headline-sm text-on-surface">⚽ World Cup 2026</div>
<p class="text-on-surface-variant font-body-sm text-body-sm">© 2026 AI World Cup Predictor. All rights reserved.</p>
<div class="flex gap-lg">
<a class="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-all" href="#">Privacy Policy</a>
<a class="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-all" href="#">Terms of Service</a>
<a class="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-all" href="#">API Docs</a>
<a class="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-all" href="#">Contact Support</a>
</div>
</div>
</footer>
<script>
        // Micro-interaction for submit buttons
        document.querySelectorAll('button').forEach(button => {
            if (button.innerText.includes('Submit')) {
                button.addEventListener('click', function() {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span class="material-symbols-outlined animate-spin" data-icon="sync">sync</span> Submitting...';
                    this.classList.add('opacity-80', 'pointer-events-none');
                    
                    setTimeout(() => {
                        this.innerHTML = '<span class="material-symbols-outlined" data-icon="check_circle">check_circle</span> Success';
                        this.classList.replace('bg-primary-container', 'bg-tertiary-container');
                        this.classList.replace('text-on-primary-container', 'text-on-tertiary-container');
                    }, 1200);
                });
            }
        });
    </script>
</body></html>

<!-- Match Predictor - World Cup 2026 Predictor -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Golden Glove Predictor | World Cup 2026</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind Configuration -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                "inverse-on-surface": "#2a2f46",
                "on-primary-container": "#613b00",
                "surface-container-lowest": "#080d22",
                "error": "#ffb4ab",
                "surface-container-high": "#24293f",
                "on-error-container": "#ffdad6",
                "on-tertiary": "#003824",
                "on-tertiary-fixed-variant": "#005236",
                "surface-variant": "#2f344b",
                "on-secondary-fixed-variant": "#004395",
                "on-primary": "#472a00",
                "primary": "#ffc174",
                "surface": "#0d1227",
                "secondary-fixed": "#d8e2ff",
                "on-primary-fixed-variant": "#653e00",
                "on-surface-variant": "#d8c3ad",
                "secondary-fixed-dim": "#adc6ff",
                "outline": "#a08e7a",
                "tertiary": "#56e5a9",
                "surface-container": "#191e34",
                "surface-tint": "#ffb95f",
                "inverse-surface": "#dde1ff",
                "surface-bright": "#33384f",
                "inverse-primary": "#855300",
                "primary-fixed": "#ffddb8",
                "on-secondary-container": "#e6ecff",
                "on-error": "#690005",
                "background": "#0d1227",
                "outline-variant": "#534434",
                "on-surface": "#dde1ff",
                "secondary": "#adc6ff",
                "tertiary-container": "#30c88f",
                "tertiary-fixed": "#6ffbbe",
                "on-background": "#dde1ff",
                "tertiary-fixed-dim": "#4edea3",
                "on-primary-fixed": "#2a1700",
                "on-secondary-fixed": "#001a42",
                "error-container": "#93000a",
                "surface-container-low": "#151a30",
                "surface-container-highest": "#2f344b",
                "on-tertiary-fixed": "#002113",
                "on-tertiary-container": "#004e34",
                "secondary-container": "#0566d9",
                "primary-container": "#f59e0b",
                "primary-fixed-dim": "#ffb95f",
                "on-secondary": "#002e6a",
                "surface-dim": "#0d1227",
                "goalkeeper-blue": "#3B82F6"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "gutter": "24px",
                "xs": "4px",
                "md": "16px",
                "container-max": "1280px",
                "sm": "8px",
                "base": "4px",
                "3xl": "64px",
                "2xl": "48px",
                "lg": "24px",
                "xl": "32px"
            },
            "fontFamily": {
                "headline-lg": ["Montserrat"],
                "label-lg": ["Inter"],
                "headline-md": ["Montserrat"],
                "body-sm": ["Inter"],
                "headline-sm": ["Montserrat"],
                "body-lg": ["Inter"],
                "label-md": ["Inter"],
                "body-md": ["Inter"],
                "display-md": ["Montserrat"],
                "display-lg": ["Montserrat"]
            }
          }
        }
      }
    </script>
<style>
        body {
            background-color: #0d1227;
            color: #dde1ff;
            font-family: 'Inter', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(42, 47, 69, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(58, 63, 85, 1);
        }
        .goalkeeper-gradient {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(13, 18, 39, 0) 100%);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #3a3f55;
            border-radius: 10px;
        }
    </style>
</head>
<body class="flex flex-col min-h-screen">
<!-- TopNavBar -->
<header class="bg-surface-container-highest dark:bg-surface-container-highest fixed top-0 w-full h-16 z-50 border-b border-outline-variant shadow-sm flex justify-between items-center px-lg w-full">
<div class="flex items-center gap-md">
<span class="font-headline-md text-headline-md text-primary dark:text-primary">⚽ World Cup 2026</span>
</div>
<div class="flex items-center gap-md">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80">logout</button>
<div class="w-10 h-10 rounded-full bg-surface-variant overflow-hidden border border-outline-variant">
<img class="w-full h-full object-cover" data-alt="A professional headshot of a sports analyst with a clean, corporate aesthetic. The person is smiling confidently, wearing a navy blue suit against a soft-focus studio background with warm, cinematic lighting. High-end photography style with shallow depth of field and sharp details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8iQQ4h0AzoRC5mliqdOSwc80MLlvunWULkXwByF3L9WfZr1zRId6y3cP3mqcpFk1NLm_tWmrNF4wzZW9yDEYFdtt7j0wuqiEvYzNqb70fZPoxa-NUOSwC_GJT02Dz0kF1FdL8J-dYe_Yxu9tKMmmOSw9inNaO72t6Yer5xhoY25ezPpimkdUPwG9XTHvEOSbhfMiaEpytttEqTLFexXYwflgeM077sdRcoygpURD_-aA-4ngLcrTrL59UuXRsOADUJX3tFGpblSU"/>
</div>
</div>
</header>
<div class="flex flex-1 pt-16">
<!-- SideNavBar -->
<aside class="bg-surface-container-low dark:bg-surface-container-low fixed left-0 top-16 w-64 h-[calc(100vh-64px)] border-r border-outline-variant flex flex-col p-md gap-sm z-40 hidden md:flex">
<div class="mb-lg px-sm">
<p class="font-headline-sm text-headline-sm text-primary">Pro Analyst</p>
<p class="font-body-md text-body-md text-on-surface-variant">Premium Tier</p>
</div>
<nav class="flex flex-col gap-xs">
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90 font-label-lg text-label-lg" href="#">
<span class="material-symbols-outlined">dashboard</span> Dashboard
                </a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90 font-label-lg text-label-lg" href="#">
<span class="material-symbols-outlined">analytics</span> Match Predictor
                </a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90 font-label-lg text-label-lg" href="#">
<span class="material-symbols-outlined">sports_soccer</span> Golden Boot
                </a>
<a class="flex items-center gap-md p-md bg-primary-container text-on-primary-container rounded-lg font-bold transition-all duration-200 scale-95 active:scale-90 font-label-lg text-label-lg" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">front_hand</span> Golden Glove
                </a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90 font-label-lg text-label-lg" href="#">
<span class="material-symbols-outlined">psychology</span> Match Simulator
                </a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90 font-label-lg text-label-lg" href="#">
<span class="material-symbols-outlined">trophy</span> Tournament Simulator
                </a>
</nav>
</aside>
<!-- Main Content -->
<main class="flex-1 md:ml-64 p-lg pb-32">
<div class="max-w-container-max mx-auto">
<!-- Page Header -->
<div class="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
<div>
<h1 class="font-display-md text-display-md text-on-surface mb-xs">Golden Glove Predictor</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Analyze advanced metrics and AI probabilities to predict the tournament's most outstanding goalkeeper. The Golden Glove is awarded to the best keeper as decided by the FIFA Technical Study Group.</p>
</div>
<div class="bg-surface-container-high px-lg py-md rounded-xl border border-outline-variant flex items-center gap-md">
<span class="material-symbols-outlined text-goalkeeper-blue">info</span>
<span class="font-label-lg text-label-lg text-on-surface">Submission Deadline: June 10, 2026</span>
</div>
</div>
<!-- Current Pick Card -->
<section class="mb-xl">
<div class="glass-card rounded-2xl p-xl goalkeeper-gradient flex flex-col md:flex-row items-center gap-xl relative overflow-hidden">
<div class="absolute -right-16 -bottom-16 opacity-10 pointer-events-none">
<span class="material-symbols-outlined text-[240px] text-goalkeeper-blue" style="font-variation-settings: 'FILL' 1;">front_hand</span>
</div>
<div class="relative z-10 w-40 h-40 rounded-full border-4 border-goalkeeper-blue shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden">
<img class="w-full h-full object-cover" data-alt="A detailed, hyper-realistic close-up portrait of a elite goalkeeper wearing a professional blue athletic jersey. The lighting is cinematic, mimicking a stadium under floodlights at night, with sharp highlights on the facial features. The style is high-performance sports photography, capturing intensity and focus in the eyes. Dark, moody background consistent with a nocturnal stadium vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj3dHluSVtXR049flOSoLhk5-k8_Oxbg8YXF-9KnJFJ9iCuNGO_v7YTX5z_olpj957puI7sDN_hdAdbrIGk7dk1-aCnCI81dTjChCbuIERDcZPXcC02ceemZeIicl3U1xHyrVWJJ9exZSieCsT120ZF7CwBZTR7yqGcS-QvpluQqmlgxoNJW4LQIM9rkES1S1kBKoqK4mvMAbiBr0byXNtxN9XowQXaf7eJ_YCVopHpVLGLLQkU3BBO2tOZKO5EaVOHmfYWqWLGyE"/>
</div>
<div class="flex-1 relative z-10 text-center md:text-left">
<p class="font-label-lg text-label-lg text-goalkeeper-blue uppercase tracking-widest mb-xs">Current Prediction</p>
<h2 class="font-display-lg text-display-lg text-on-surface">Alisson Becker</h2>
<div class="flex flex-wrap justify-center md:justify-start gap-xl mt-md">
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface-variant">Team</span>
<span class="font-headline-sm text-headline-sm text-on-surface">Brazil (BRA)</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface-variant">2022 Performance</span>
<span class="font-headline-sm text-headline-sm text-on-surface">3 Clean Sheets</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-on-surface-variant">AI Win Probability</span>
<span class="font-headline-sm text-headline-sm text-goalkeeper-blue">24.5%</span>
</div>
</div>
</div>
<div class="relative z-10">
<div class="bg-surface-container py-md px-lg rounded-xl border border-outline-variant flex flex-col items-center">
<span class="font-label-md text-label-md text-on-surface-variant mb-xs">Selection Points</span>
<span class="font-headline-md text-headline-md text-primary">+850</span>
</div>
</div>
</div>
</section>
<!-- Search & Filter -->
<section class="mb-lg flex flex-col md:flex-row gap-md">
<div class="flex-1 relative">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full pl-3xl pr-md py-md bg-surface-variant border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-goalkeeper-blue transition-all" placeholder="Search goalkeepers by name or team..." type="text"/>
</div>
<div class="flex gap-md">
<button class="bg-surface-container-high px-xl py-md rounded-lg border border-outline-variant text-on-surface font-label-lg text-label-lg hover:border-goalkeeper-blue transition-all flex items-center gap-sm">
<span class="material-symbols-outlined">filter_list</span> Filters
                        </button>
<button class="bg-surface-container-high px-xl py-md rounded-lg border border-outline-variant text-on-surface font-label-lg text-label-lg hover:border-goalkeeper-blue transition-all flex items-center gap-sm">
<span class="material-symbols-outlined">sort</span> AI Odds
                        </button>
</div>
</section>
<!-- Player Cards Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
<!-- Player Card 1 (Selected) -->
<div class="glass-card rounded-2xl overflow-hidden border-2 border-goalkeeper-blue bg-goalkeeper-blue/5 group cursor-pointer transition-all duration-300">
<div class="h-48 relative overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A professional studio portrait of Alisson Becker, Brazil's goalkeeper, wearing the official blue and yellow team jersey. The lighting is dramatic and focused, highlighting the athlete's determined expression. The background is a subtle dark navy with modern geometric textures. High-end, premium sports commercial photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyRpszS91JyYpa6nZnqhySVSfbKZ0ZhH7Boj0sRoluS4Lx8IlOLIlATr1-wRd_LZLISBwHv4wlK2YWuc_ZrUWUblA8DtX0BxL8BLXvjI3_lXbPznNXqZ93Cpq7wPKLFrkM22bq5Ys1ID3tqD0qxqXk2D6j6DzM2QGMHtJHLIe3zMqPaOUBauvMsBfCAGdHjlI7ZnzpwXA_KsyS5kLBXlrbO1iNcmoss51KX3CvhcH_HyzTMuEVpiAHn7Jf-7cEP_2_qaFoVyDr-NE"/>
<div class="absolute top-md right-md bg-goalkeeper-blue text-on-surface px-md py-xs rounded-full font-label-md text-label-md">
                                SELECTED
                            </div>
<div class="absolute bottom-0 left-0 right-0 p-md bg-gradient-to-t from-surface to-transparent">
<p class="font-headline-sm text-headline-sm text-on-surface">Alisson Becker</p>
<p class="font-label-md text-label-md text-on-surface-variant">Brazil (BRA)</p>
</div>
</div>
<div class="p-lg">
<div class="grid grid-cols-2 gap-md mb-lg">
<div class="bg-surface-container-low p-md rounded-lg">
<p class="font-label-md text-label-md text-outline">Save %</p>
<p class="font-headline-sm text-headline-sm text-on-surface">82.4%</p>
</div>
<div class="bg-surface-container-low p-md rounded-lg">
<p class="font-label-md text-label-md text-outline">Clean Sheets</p>
<p class="font-headline-sm text-headline-sm text-on-surface">12</p>
</div>
</div>
<div class="mb-lg">
<p class="font-label-md text-label-md text-goalkeeper-blue mb-sm">AI PREDICTION</p>
<div class="flex items-center justify-between">
<span class="font-body-md text-body-md text-on-surface">Predicted Saves / Game</span>
<span class="font-headline-sm text-headline-sm text-on-surface">4.8</span>
</div>
<div class="w-full bg-surface-variant h-1.5 rounded-full mt-sm overflow-hidden">
<div class="bg-goalkeeper-blue h-full w-[85%]"></div>
</div>
</div>
<button class="w-full bg-goalkeeper-blue text-on-surface py-md rounded-xl font-label-lg text-label-lg font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                                Selection Active
                            </button>
</div>
</div>
<!-- Player Card 2 -->
<div class="glass-card rounded-2xl overflow-hidden group border-outline-variant hover:border-goalkeeper-blue/50 cursor-pointer transition-all duration-300">
<div class="h-48 relative overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A professional studio portrait of Thibaut Courtois, Belgium's goalkeeper, in a focused and calm pose. He is wearing the team's official red and black kit. The lighting is sophisticated, with blue ambient accents reflecting off the jersey to create a high-tech atmosphere. Cinematic dark mode aesthetic with professional depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAbzPrxDuw-pBRW--1LfFdsHvI7aDs290-6pXUrLxWytOu-foCCqX-NC4nLdphNWXayN3T78pRnuhYa9wVexj-gm27Fv-ZsASXcme4Nx0lfMScaZk7d9NZTJk7nrMXnXoNjgh881JzqlUvN1xJCND_6LpkaEBgKus7m5pIhio-Y2xqYfIb_4O6kJxFiadCb9jMtnGAuRHXEDNCuB3J3Mh1vmyWWcwvdsH0r3NgRvCTpPA4xjN_WWJsj1Tv-cFTOBtgbyKfI6ACKqg"/>
<div class="absolute bottom-0 left-0 right-0 p-md bg-gradient-to-t from-surface to-transparent">
<p class="font-headline-sm text-headline-sm text-on-surface">Thibaut Courtois</p>
<p class="font-label-md text-label-md text-on-surface-variant">Belgium (BEL)</p>
</div>
</div>
<div class="p-lg">
<div class="grid grid-cols-2 gap-md mb-lg">
<div class="bg-surface-container-low p-md rounded-lg">
<p class="font-label-md text-label-md text-outline">Save %</p>
<p class="font-headline-sm text-headline-sm text-on-surface">79.1%</p>
</div>
<div class="bg-surface-container-low p-md rounded-lg">
<p class="font-label-md text-label-md text-outline">Clean Sheets</p>
<p class="font-headline-sm text-headline-sm text-on-surface">10</p>
</div>
</div>
<div class="mb-lg">
<p class="font-label-md text-label-md text-goalkeeper-blue mb-sm">AI PREDICTION</p>
<div class="flex items-center justify-between">
<span class="font-body-md text-body-md text-on-surface">Predicted Saves / Game</span>
<span class="font-headline-sm text-headline-sm text-on-surface">4.2</span>
</div>
<div class="w-full bg-surface-variant h-1.5 rounded-full mt-sm overflow-hidden">
<div class="bg-goalkeeper-blue h-full w-[72%]"></div>
</div>
</div>
<button class="w-full bg-surface-variant text-on-surface border border-outline-variant py-md rounded-xl font-label-lg text-label-lg hover:bg-goalkeeper-blue/10 hover:border-goalkeeper-blue transition-all">
                                Select Prediction
                            </button>
</div>
</div>
<!-- Player Card 3 -->
<div class="glass-card rounded-2xl overflow-hidden group border-outline-variant hover:border-goalkeeper-blue/50 cursor-pointer transition-all duration-300">
<div class="h-48 relative overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A sharp, detailed portrait of Emiliano Martínez, Argentina's goalkeeper, wearing the light blue and white stripes of the national team. He has an intense, charismatic expression. The lighting is strong and focused, with a slight golden glow on the edges to signify elite performance. Modern corporate sports aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDiSxoXUSqNW4MTiReDzJs0MuIul07h14_eL4L10rrNjYVSjV1uDUjmANohFnDeYyjULnAc8UUyl_9PbNmzFxNbAyqDwiHq-JaKYCP4AtZU7MbveEosBOQM3Ge1s2lbl68pjCvjD7wIWdw-N-LTnOxoyRDD1eh4ZTR3tnIRptpCezqj81eFhMLnfz8Q7L4sF5QNsSBsbmX104-cfAQpGHA_ZrYibQ3YiLtxjt7w0kGrf3kQ_u-0hiR73bWlEP2ok9ntn3RjTpcK3g"/>
<div class="absolute bottom-0 left-0 right-0 p-md bg-gradient-to-t from-surface to-transparent">
<p class="font-headline-sm text-headline-sm text-on-surface">Emiliano Martínez</p>
<p class="font-label-md text-label-md text-on-surface-variant">Argentina (ARG)</p>
</div>
</div>
<div class="p-lg">
<div class="grid grid-cols-2 gap-md mb-lg">
<div class="bg-surface-container-low p-md rounded-lg">
<p class="font-label-md text-label-md text-outline">Save %</p>
<p class="font-headline-sm text-headline-sm text-on-surface">81.0%</p>
</div>
<div class="bg-surface-container-low p-md rounded-lg">
<p class="font-label-md text-label-md text-outline">Clean Sheets</p>
<p class="font-headline-sm text-headline-sm text-on-surface">11</p>
</div>
</div>
<div class="mb-lg">
<p class="font-label-md text-label-md text-goalkeeper-blue mb-sm">AI PREDICTION</p>
<div class="flex items-center justify-between">
<span class="font-body-md text-body-md text-on-surface">Predicted Saves / Game</span>
<span class="font-headline-sm text-headline-sm text-on-surface">4.5</span>
</div>
<div class="w-full bg-surface-variant h-1.5 rounded-full mt-sm overflow-hidden">
<div class="bg-goalkeeper-blue h-full w-[80%]"></div>
</div>
</div>
<button class="w-full bg-surface-variant text-on-surface border border-outline-variant py-md rounded-xl font-label-lg text-label-lg hover:bg-goalkeeper-blue/10 hover:border-goalkeeper-blue transition-all">
                                Select Prediction
                            </button>
</div>
</div>
</section>
<!-- More Grid Items (Mocked) -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mt-lg">
<!-- Generic Card Template -->
<div class="glass-card rounded-2xl overflow-hidden group border-outline-variant opacity-60 hover:opacity-100 transition-all cursor-pointer">
<div class="h-48 bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-6xl text-outline">person</span>
</div>
<div class="p-lg">
<p class="font-headline-sm text-headline-sm text-on-surface mb-xs">Dominik Livaković</p>
<p class="font-label-md text-label-md text-on-surface-variant mb-md">Croatia (CRO)</p>
<div class="flex justify-between items-center bg-surface-container-low p-md rounded-lg mb-md">
<span class="font-label-md text-label-md text-outline">AI Win Odds</span>
<span class="font-headline-sm text-headline-sm text-on-surface">12/1</span>
</div>
<button class="w-full bg-surface-variant text-on-surface border border-outline-variant py-md rounded-xl font-label-lg text-label-lg">Select Prediction</button>
</div>
</div>
<!-- Card 5 -->
<div class="glass-card rounded-2xl overflow-hidden group border-outline-variant opacity-60 hover:opacity-100 transition-all cursor-pointer">
<div class="h-48 bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-6xl text-outline">person</span>
</div>
<div class="p-lg">
<p class="font-headline-sm text-headline-sm text-on-surface mb-xs">Jordan Pickford</p>
<p class="font-label-md text-label-md text-on-surface-variant mb-md">England (ENG)</p>
<div class="flex justify-between items-center bg-surface-container-low p-md rounded-lg mb-md">
<span class="font-label-md text-label-md text-outline">AI Win Odds</span>
<span class="font-headline-sm text-headline-sm text-on-surface">14/1</span>
</div>
<button class="w-full bg-surface-variant text-on-surface border border-outline-variant py-md rounded-xl font-label-lg text-label-lg">Select Prediction</button>
</div>
</div>
<!-- Card 6 -->
<div class="glass-card rounded-2xl overflow-hidden group border-outline-variant opacity-60 hover:opacity-100 transition-all cursor-pointer">
<div class="h-48 bg-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined text-6xl text-outline">person</span>
</div>
<div class="p-lg">
<p class="font-headline-sm text-headline-sm text-on-surface mb-xs">Yassine Bounou</p>
<p class="font-label-md text-label-md text-on-surface-variant mb-md">Morocco (MAR)</p>
<div class="flex justify-between items-center bg-surface-container-low p-md rounded-lg mb-md">
<span class="font-label-md text-label-md text-outline">AI Win Odds</span>
<span class="font-headline-sm text-headline-sm text-on-surface">18/1</span>
</div>
<button class="w-full bg-surface-variant text-on-surface border border-outline-variant py-md rounded-xl font-label-lg text-label-lg">Select Prediction</button>
</div>
</div>
</section>
</div>
</main>
</div>
<!-- Sticky Bottom CTA -->
<div class="fixed bottom-0 left-0 md:left-64 right-0 z-50 p-lg bg-surface/90 backdrop-blur-md border-t border-outline-variant">
<div class="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
<div class="flex items-center gap-md">
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-surface bg-goalkeeper-blue flex items-center justify-center text-xs font-bold text-on-surface">1</div>
<div class="w-8 h-8 rounded-full border-2 border-surface bg-surface-variant flex items-center justify-center text-xs font-bold text-outline">2</div>
</div>
<p class="font-body-md text-body-md text-on-surface">Selection locked: <span class="font-bold text-goalkeeper-blue">Alisson Becker</span></p>
</div>
<div class="flex gap-md w-full md:w-auto">
<button class="flex-1 md:flex-none px-2xl py-md bg-surface-variant text-on-surface rounded-xl font-label-lg text-label-lg border border-outline-variant hover:bg-surface-container-high transition-all">
                    Reset
                </button>
<button class="flex-1 md:flex-none px-3xl py-md bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold shadow-[0_0_20px_rgba(255,193,116,0.2)] hover:scale-105 active:scale-95 transition-all">
                    Submit Prediction
                </button>
</div>
</div>
</div>
<!-- Footer -->
<footer class="md:ml-64 bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-xl border-t border-outline-variant">
<div class="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md">
<p class="font-body-sm text-body-sm text-on-surface-variant">© 2026 AI World Cup Predictor. All rights reserved.</p>
<div class="flex gap-lg">
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Privacy Policy</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Terms of Service</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">API Docs</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Contact Support</a>
</div>
</div>
</footer>
<script>
        // Micro-interaction for player selection (client-side only for visual feedback)
        document.querySelectorAll('.glass-card.group').forEach(card => {
            card.addEventListener('click', function() {
                if (!this.classList.contains('border-goalkeeper-blue')) {
                    // Logic to show change (simulated)
                    console.log('Player selected');
                }
            });
        });
    </script>
</body></html>

<!-- Golden Glove - World Cup 2026 Predictor -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Tournament Simulator | World Cup 2026</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            background-color: #0d1227;
            color: #dde1ff;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .bracket-line {
            background-color: #534434;
        }
        .glass-panel {
            background: rgba(42, 47, 69, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(58, 63, 85, 0.5);
        }
        .gold-glow:hover {
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.4);
            border-color: #f59e0b;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .active-tab-glow {
            box-shadow: inset 0 0 10px rgba(245, 158, 11, 0.2);
        }
        /* Custom scrollbar for data-heavy sections */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1227; }
        ::-webkit-scrollbar-thumb { background: #2f344b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #ffc174; }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "inverse-on-surface": "#2a2f46",
                        "on-primary-container": "#613b00",
                        "surface-container-lowest": "#080d22",
                        "error": "#ffb4ab",
                        "surface-container-high": "#24293f",
                        "on-error-container": "#ffdad6",
                        "on-tertiary": "#003824",
                        "on-tertiary-fixed-variant": "#005236",
                        "surface-variant": "#2f344b",
                        "on-secondary-fixed-variant": "#004395",
                        "on-primary": "#472a00",
                        "primary": "#ffc174",
                        "surface": "#0d1227",
                        "secondary-fixed": "#d8e2ff",
                        "on-primary-fixed-variant": "#653e00",
                        "on-surface-variant": "#d8c3ad",
                        "secondary-fixed-dim": "#adc6ff",
                        "outline": "#a08e7a",
                        "tertiary": "#56e5a9",
                        "surface-container": "#191e34",
                        "surface-tint": "#ffb95f",
                        "inverse-surface": "#dde1ff",
                        "surface-bright": "#33384f",
                        "inverse-primary": "#855300",
                        "primary-fixed": "#ffddb8",
                        "on-secondary-container": "#e6ecff",
                        "on-error": "#690005",
                        "background": "#0d1227",
                        "outline-variant": "#534434",
                        "on-surface": "#dde1ff",
                        "secondary": "#adc6ff",
                        "tertiary-container": "#30c88f",
                        "tertiary-fixed": "#6ffbbe",
                        "on-background": "#dde1ff",
                        "tertiary-fixed-dim": "#4edea3",
                        "on-primary-fixed": "#2a1700",
                        "on-secondary-fixed": "#001a42",
                        "error-container": "#93000a",
                        "surface-container-low": "#151a30",
                        "surface-container-highest": "#2f344b",
                        "on-tertiary-fixed": "#002113",
                        "on-tertiary-container": "#004e34",
                        "secondary-container": "#0566d9",
                        "primary-container": "#f59e0b",
                        "primary-fixed-dim": "#ffb95f",
                        "on-secondary": "#002e6a",
                        "surface-dim": "#0d1227"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "xs": "4px",
                        "md": "16px",
                        "container-max": "1280px",
                        "sm": "8px",
                        "base": "4px",
                        "3xl": "64px",
                        "2xl": "48px",
                        "lg": "24px",
                        "xl": "32px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Montserrat"],
                        "label-lg": ["Inter"],
                        "headline-md": ["Montserrat"],
                        "body-sm": ["Inter"],
                        "headline-sm": ["Montserrat"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "body-md": ["Inter"],
                        "display-md": ["Montserrat"],
                        "headline-lg-mobile": ["Montserrat"],
                        "display-lg": ["Montserrat"]
                    },
                    "fontSize": {
                        "headline-lg": ["30px", {"lineHeight": "38px", "fontWeight": "700"}],
                        "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "display-md": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col">
<!-- TopNavBar -->
<nav class="bg-surface-container-highest dark:bg-surface-container-highest fixed top-0 w-full h-16 z-50 border-b border-outline-variant shadow-sm flex justify-between items-center px-lg w-full">
<div class="flex items-center gap-md">
<span class="font-headline-md text-headline-md text-primary dark:text-primary tracking-tighter">⚽ World Cup 2026</span>
</div>
<div class="flex items-center gap-lg">
<div class="hidden md:flex gap-md">
<span class="text-on-surface-variant font-label-lg text-label-lg hover:text-primary-fixed-dim transition-colors cursor-pointer active:opacity-80">Marketplace</span>
<span class="text-on-surface-variant font-label-lg text-label-lg hover:text-primary-fixed-dim transition-colors cursor-pointer active:opacity-80">Insights</span>
<span class="text-on-surface-variant font-label-lg text-label-lg hover:text-primary-fixed-dim transition-colors cursor-pointer active:opacity-80">Live Odds</span>
</div>
<div class="flex items-center gap-sm">
<div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Professional user profile avatar, clean studio lighting, high-end corporate style for a premium analyst profile, wearing a sleek navy suit, 8k resolution portrait with a soft bokeh background of a high-tech control center with data screens." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2AJ3VHuN8gwL29QqKSxrrOS4-7pbLyZUwCqfI5T4r_Bxvq5ps8YYTDYlFyIkc_FvI6HAf7Q05vJf7ZWDIDHF3ahcpVNZah3zOLB1t0PHaJcHHENu3E91Y3U5eQYwO-Ke1mM_hgSeArXKjefvDgmXIsPkEikwTxS5SDjjkZYJ-N4V4Em_j_WWBHL-A4mASw0oT-pfvS9gVW1WBVDQXmGuSRKHqthANUSbkFxVKIrxr9WR-k3yXxi5GOCl0q0QZRwX4w9VXHzZgnE"/>
</div>
<span class="material-symbols-outlined text-primary cursor-pointer active:opacity-80">logout</span>
</div>
</div>
</nav>
<div class="flex pt-16 flex-1 relative">
<!-- SideNavBar -->
<aside class="bg-surface-container-low dark:bg-surface-container-low fixed left-0 top-16 w-64 h-[calc(100vh-64px)] border-r border-outline-variant flex flex-col p-md gap-sm z-40">
<div class="flex items-center gap-md p-md mb-md">
<div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container" style="font-variation-settings: 'FILL' 1;">analytics</span>
</div>
<div>
<p class="font-label-lg text-label-lg text-primary">Pro Analyst</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">Premium Tier</p>
</div>
</div>
<nav class="flex flex-col gap-xs">
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-lg text-label-lg">Dashboard</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-lg text-label-lg">Match Predictor</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">sports_soccer</span>
<span class="font-label-lg text-label-lg">Golden Boot</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">front_hand</span>
<span class="font-label-lg text-label-lg">Golden Glove</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">psychology</span>
<span class="font-label-lg text-label-lg">Match Simulator</span>
</a>
<!-- Active Tab -->
<a class="flex items-center gap-md p-md bg-primary-container text-on-primary-container rounded-lg font-bold transition-all duration-200 scale-95 active:scale-90 active-tab-glow" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">trophy</span>
<span class="font-label-lg text-label-lg">Tournament Simulator</span>
</a>
</nav>
<div class="mt-auto p-md glass-panel rounded-xl border border-outline-variant/30">
<p class="font-label-md text-label-md text-primary mb-xs">SIMULATION CAPACITY</p>
<div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-primary" style="width: 75%"></div>
</div>
<p class="font-body-sm text-body-sm mt-xs text-on-surface-variant text-[10px]">7,500 / 10,000 runs remaining</p>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 flex-1 p-lg bg-surface relative overflow-y-auto">
<!-- Background Shader -->
<div class="fixed inset-0 pointer-events-none opacity-20 ml-64 mt-16">

</div>
<div class="max-w-container-max mx-auto relative z-10">
<!-- Header & Controls -->
<header class="flex flex-col md:flex-row md:items-center justify-between gap-lg mb-2xl">
<div>
<h1 class="font-display-md text-display-md text-on-surface tracking-tight">Tournament Simulator</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">Run 10,000+ Monte Carlo simulations to project every possible bracket path.</p>
</div>
<div class="flex items-center gap-md glass-panel p-md rounded-xl">
<div class="flex flex-col gap-xs">
<label class="font-label-md text-label-md text-on-surface-variant">ITERATIONS</label>
<select class="bg-surface-variant border-none rounded-lg font-label-lg text-label-lg text-on-surface py-2 px-md focus:ring-2 focus:ring-primary outline-none cursor-pointer">
<option>1,000 Runs</option>
<option selected="">10,000 Runs</option>
<option>50,000 Runs (Ultra)</option>
</select>
</div>
<button class="bg-primary text-on-primary-fixed h-[44px] mt-auto px-xl rounded-lg font-label-lg text-label-lg flex items-center gap-sm gold-glow transition-all active:scale-95">
<span class="material-symbols-outlined">play_arrow</span>
                            RUN SIMULATION
                        </button>
</div>
</header>
<!-- Tournament Overview Bento Grid -->
<div class="grid grid-cols-12 gap-lg mb-3xl">
<!-- Probabilities Panel (Left) -->
<section class="col-span-12 lg:col-span-3 flex flex-col gap-lg">
<div class="glass-panel p-lg rounded-xl border border-outline-variant">
<h3 class="font-headline-sm text-headline-sm text-primary mb-lg flex items-center justify-between">
                                Win Probability
                                <span class="material-symbols-outlined text-on-surface-variant">info</span>
</h3>
<div class="space-y-md">
<!-- Team Item -->
<div class="flex flex-col gap-xs group cursor-pointer">
<div class="flex justify-between items-end">
<div class="flex items-center gap-sm">
<div class="w-6 h-4 bg-primary/20 rounded-sm flex items-center justify-center text-[10px] font-bold">BRA</div>
<span class="font-label-lg text-label-lg">Brazil</span>
</div>
<span class="font-headline-sm text-headline-sm text-primary">18.4%</span>
</div>
<div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-primary group-hover:brightness-110 transition-all" style="width: 18.4%"></div>
</div>
</div>
<!-- Team Item -->
<div class="flex flex-col gap-xs group cursor-pointer">
<div class="flex justify-between items-end">
<div class="flex items-center gap-sm">
<div class="w-6 h-4 bg-tertiary/20 rounded-sm flex items-center justify-center text-[10px] font-bold">FRA</div>
<span class="font-label-lg text-label-lg">France</span>
</div>
<span class="font-headline-sm text-headline-sm text-tertiary">14.2%</span>
</div>
<div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-tertiary group-hover:brightness-110 transition-all" style="width: 14.2%"></div>
</div>
</div>
<!-- Team Item -->
<div class="flex flex-col gap-xs group cursor-pointer">
<div class="flex justify-between items-end">
<div class="flex items-center gap-sm">
<div class="w-6 h-4 bg-secondary/20 rounded-sm flex items-center justify-center text-[10px] font-bold">ARG</div>
<span class="font-label-lg text-label-lg">Argentina</span>
</div>
<span class="font-headline-sm text-headline-sm text-secondary">12.9%</span>
</div>
<div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-secondary group-hover:brightness-110 transition-all" style="width: 12.9%"></div>
</div>
</div>
<!-- Team Item -->
<div class="flex flex-col gap-xs group cursor-pointer">
<div class="flex justify-between items-end">
<div class="flex items-center gap-sm">
<div class="w-6 h-4 bg-on-surface-variant/20 rounded-sm flex items-center justify-center text-[10px] font-bold">ENG</div>
<span class="font-label-lg text-label-lg">England</span>
</div>
<span class="font-headline-sm text-headline-sm text-on-surface-variant">9.8%</span>
</div>
<div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div class="h-full bg-on-surface-variant group-hover:brightness-110 transition-all" style="width: 9.8%"></div>
</div>
</div>
</div>
<button class="w-full mt-xl text-center py-sm font-label-md text-label-md text-primary hover:underline transition-all">VIEW FULL RANKINGS</button>
</div>
<div class="glass-panel p-lg rounded-xl border border-outline-variant bg-[#2A2F45]/30">
<p class="font-label-md text-label-md text-on-surface-variant mb-md">PREMIUM INSIGHT</p>
<p class="font-body-md text-body-md italic text-on-surface">"Based on current data, Brazil has a 62% chance of reaching the Semi-Finals if they avoid France in the QF stage."</p>
</div>
</section>
<!-- Interactive Bracket (Middle/Right) -->
<section class="col-span-12 lg:col-span-9 glass-panel rounded-xl border border-outline-variant overflow-x-auto p-xl">
<div class="min-w-[1000px] flex justify-between relative">
<!-- Round of 16 (Left) -->
<div class="flex flex-col justify-around gap-lg py-md">
<h4 class="font-label-lg text-label-lg text-on-surface-variant text-center mb-md">ROUND OF 16</h4>
<!-- Match 1 -->
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center mb-1">
<span class="font-label-md text-label-md">Germany</span>
<span class="font-label-md text-label-md text-primary">2</span>
</div>
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">Japan</span>
<span class="font-label-md text-label-md">1</span>
</div>
</div>
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">Portugal</span>
<span class="font-label-md text-label-md">0</span>
</div>
<div class="flex justify-between items-center">
<span class="font-label-md text-label-md">Brazil</span>
<span class="font-label-md text-label-md text-primary">3</span>
</div>
</div>
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center">
<span class="font-label-md text-label-md">France</span>
<span class="font-label-md text-label-md text-primary">4</span>
</div>
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">USA</span>
<span class="font-label-md text-label-md">1</span>
</div>
</div>
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center">
<span class="font-label-md text-label-md">Italy</span>
<span class="font-label-md text-label-md text-primary">2</span>
</div>
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">Senegal</span>
<span class="font-label-md text-label-md">1</span>
</div>
</div>
</div>
<!-- Lines (R16 to QF) -->
<div class="flex flex-col justify-around py-md">
<div class="w-8 h-[calc(50%-20px)] border-r-2 border-y-2 border-outline-variant rounded-r-lg"></div>
<div class="w-8 h-[calc(50%-20px)] border-r-2 border-y-2 border-outline-variant rounded-r-lg"></div>
</div>
<!-- Quarter Finals -->
<div class="flex flex-col justify-around gap-xl py-md">
<h4 class="font-label-lg text-label-lg text-on-surface-variant text-center mb-md">QUARTER-FINALS</h4>
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant border-primary shadow-[0_0_10px_rgba(245,158,11,0.15)] gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">Germany</span>
<span class="font-label-md text-label-md">1</span>
</div>
<div class="flex justify-between items-center">
<span class="font-label-md text-label-md">Brazil</span>
<span class="font-label-md text-label-md text-primary">2</span>
</div>
</div>
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center">
<span class="font-label-md text-label-md">France</span>
<span class="font-label-md text-label-md text-primary">3</span>
</div>
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">Italy</span>
<span class="font-label-md text-label-md">0</span>
</div>
</div>
</div>
<!-- Lines (QF to SF) -->
<div class="flex flex-col justify-center py-md">
<div class="w-8 h-[25%] border-r-2 border-y-2 border-outline-variant rounded-r-lg"></div>
</div>
<!-- Semi Finals -->
<div class="flex flex-col justify-center py-md">
<h4 class="font-label-lg text-label-lg text-on-surface-variant text-center mb-md">SEMI-FINALS</h4>
<div class="w-48 bg-surface-container rounded-lg p-sm border border-outline-variant gold-glow transition-all cursor-pointer">
<div class="flex justify-between items-center">
<span class="font-label-md text-label-md">Brazil</span>
<span class="font-label-md text-label-md text-primary">1</span>
</div>
<div class="flex justify-between items-center opacity-60">
<span class="font-label-md text-label-md">France</span>
<span class="font-label-md text-label-md">0</span>
</div>
</div>
</div>
<!-- Lines (SF to Final) -->
<div class="flex flex-col justify-center py-md">
<div class="w-12 h-0.5 border-t-2 border-outline-variant"></div>
</div>
<!-- Final -->
<div class="flex flex-col justify-center py-md">
<h4 class="font-headline-sm text-headline-sm text-primary text-center mb-md flex items-center justify-center gap-xs">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">trophy</span>
                                    FINAL
                                </h4>
<div class="w-56 bg-surface-container-high rounded-xl p-md border-2 border-primary shadow-[0_0_20px_rgba(255,193,116,0.2)] transform scale-110">
<div class="flex justify-between items-center mb-sm">
<span class="font-headline-sm text-headline-sm">Brazil</span>
<span class="font-headline-sm text-headline-sm text-primary">3</span>
</div>
<div class="flex justify-between items-center opacity-50">
<span class="font-body-md text-body-md">Argentina</span>
<span class="font-body-md text-body-md">1</span>
</div>
<div class="mt-md pt-sm border-t border-outline-variant text-center">
<span class="font-label-md text-label-md text-primary">STADIUM: MetLife Stadium</span>
</div>
</div>
</div>
</div>
<!-- Bracket Controls Overlay -->
<div class="mt-xl flex justify-center gap-md">
<button class="bg-surface-variant text-on-surface px-md py-sm rounded-lg font-label-md text-label-md flex items-center gap-xs hover:bg-outline-variant transition-all">
<span class="material-symbols-outlined text-[18px]">shuffle</span>
                                RANDOMIZE SEEDS
                            </button>
<button class="bg-surface-variant text-on-surface px-md py-sm rounded-lg font-label-md text-label-md flex items-center gap-xs hover:bg-outline-variant transition-all">
<span class="material-symbols-outlined text-[18px]">save</span>
                                EXPORT BRACKET
                            </button>
</div>
</section>
</div>
<!-- Simulation Metrics Section -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-3xl">
<div class="glass-panel p-lg rounded-xl flex items-center gap-lg">
<div class="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary">trending_up</span>
</div>
<div>
<p class="font-label-md text-label-md text-on-surface-variant">BIGGEST CLIMBER</p>
<p class="font-headline-sm text-headline-sm">Morocco (+12%)</p>
</div>
</div>
<div class="glass-panel p-lg rounded-xl flex items-center gap-lg">
<div class="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-error">trending_down</span>
</div>
<div>
<p class="font-label-md text-label-md text-on-surface-variant">MOST VOLATILE</p>
<p class="font-headline-sm text-headline-sm">Spain (±8%)</p>
</div>
</div>
<div class="glass-panel p-lg rounded-xl flex items-center gap-lg">
<div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-primary">verified</span>
</div>
<div>
<p class="font-label-md text-label-md text-on-surface-variant">MODEL CONFIDENCE</p>
<p class="font-headline-sm text-headline-sm">High (92.4%)</p>
</div>
</div>
</div>
</div>
</main>
</div>
<!-- Footer -->
<footer class="bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-xl border-t border-outline-variant z-50">
<div class="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-lg">
<div class="flex flex-col gap-xs">
<span class="font-headline-sm text-headline-sm text-on-surface">⚽ World Cup Predictor</span>
<p class="font-body-sm text-body-sm text-on-surface-variant opacity-70">© 2026 AI World Cup Predictor. All rights reserved.</p>
</div>
<div class="flex flex-wrap justify-center gap-xl">
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#">Privacy Policy</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#">Terms of Service</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#">API Docs</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-300" href="#">Contact Support</a>
</div>
<div class="flex gap-md">
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">language</span>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">share</span>
</div>
</div>
</footer>
<script>
        // Micro-interactions for button clicks
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.add('scale-90');
                setTimeout(() => this.classList.remove('scale-90'), 100);
            });
        });

        // Add hover effects to bracket matches
        const matches = document.querySelectorAll('.gold-glow');
        matches.forEach(match => {
            match.addEventListener('mouseenter', () => {
                match.style.transform = 'translateY(-2px)';
            });
            match.addEventListener('mouseleave', () => {
                match.style.transform = 'translateY(0)';
            });
        });
    </script>
</body></html>

<!-- Tournament Simulator - World Cup 2026 Predictor -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Golden Boot Predictor | World Cup 2026</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-panel {
            background: rgba(42, 47, 69, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(58, 63, 85, 0.5);
        }
        .gold-glow {
            filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.3));
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #0d1227;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #3a3f55;
            border-radius: 10px;
        }
        .player-card-selected {
            border-color: #ffc174 !important;
            box-shadow: inset 0 0 15px rgba(245, 158, 11, 0.2);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "inverse-on-surface": "#2a2f46",
                        "on-primary-container": "#613b00",
                        "surface-container-lowest": "#080d22",
                        "error": "#ffb4ab",
                        "surface-container-high": "#24293f",
                        "on-error-container": "#ffdad6",
                        "on-tertiary": "#003824",
                        "on-tertiary-fixed-variant": "#005236",
                        "surface-variant": "#2f344b",
                        "on-secondary-fixed-variant": "#004395",
                        "on-primary": "#472a00",
                        "primary": "#ffc174",
                        "surface": "#0d1227",
                        "secondary-fixed": "#d8e2ff",
                        "on-primary-fixed-variant": "#653e00",
                        "on-surface-variant": "#d8c3ad",
                        "secondary-fixed-dim": "#adc6ff",
                        "outline": "#a08e7a",
                        "tertiary": "#56e5a9",
                        "surface-container": "#191e34",
                        "surface-tint": "#ffb95f",
                        "inverse-surface": "#dde1ff",
                        "surface-bright": "#33384f",
                        "inverse-primary": "#855300",
                        "primary-fixed": "#ffddb8",
                        "on-secondary-container": "#e6ecff",
                        "on-error": "#690005",
                        "background": "#0d1227",
                        "outline-variant": "#534434",
                        "on-surface": "#dde1ff",
                        "secondary": "#adc6ff",
                        "tertiary-container": "#30c88f",
                        "tertiary-fixed": "#6ffbbe",
                        "on-background": "#dde1ff",
                        "tertiary-fixed-dim": "#4edea3",
                        "on-primary-fixed": "#2a1700",
                        "on-secondary-fixed": "#001a42",
                        "error-container": "#93000a",
                        "surface-container-low": "#151a30",
                        "surface-container-highest": "#2f344b",
                        "on-tertiary-fixed": "#002113",
                        "on-tertiary-container": "#004e34",
                        "secondary-container": "#0566d9",
                        "primary-container": "#f59e0b",
                        "primary-fixed-dim": "#ffb95f",
                        "on-secondary": "#002e6a",
                        "surface-dim": "#0d1227"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "24px",
                        "xs": "4px",
                        "md": "16px",
                        "container-max": "1280px",
                        "sm": "8px",
                        "base": "4px",
                        "3xl": "64px",
                        "2xl": "48px",
                        "lg": "24px",
                        "xl": "32px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Montserrat"],
                        "label-lg": ["Inter"],
                        "headline-md": ["Montserrat"],
                        "body-sm": ["Inter"],
                        "headline-sm": ["Montserrat"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "body-md": ["Inter"],
                        "display-md": ["Montserrat"],
                        "display-lg": ["Montserrat"]
                    },
                    "fontSize": {
                        "headline-lg": ["30px", {"lineHeight": "38px", "fontWeight": "700"}],
                        "label-lg": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "display-md": ["36px", {"lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden custom-scrollbar">
<!-- TopNavBar -->
<header class="fixed top-0 w-full h-16 z-50 bg-surface-container-highest flex justify-between items-center px-lg shadow-sm border-b border-outline-variant">
<div class="flex items-center gap-md">
<span class="font-headline-md text-headline-md text-primary">⚽ World Cup 2026</span>
</div>
<div class="flex items-center gap-lg">
<div class="hidden md:flex items-center gap-md">
<span class="text-on-surface-variant font-label-lg text-label-lg hover:text-primary transition-colors cursor-pointer">Live Odds</span>
<span class="text-on-surface-variant font-label-lg text-label-lg hover:text-primary transition-colors cursor-pointer">Analyst Pro</span>
</div>
<div class="flex items-center gap-sm">
<div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container text-[18px]">person</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer active:opacity-80">logout</span>
</div>
</div>
</header>
<!-- SideNavBar -->
<aside class="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-surface-container-low border-r border-outline-variant flex flex-col p-md gap-sm hidden md:flex">
<div class="flex flex-col gap-xs mb-lg px-sm">
<span class="font-headline-sm text-headline-sm text-primary">Pro Analyst</span>
<span class="font-body-sm text-body-sm text-on-surface-variant opacity-70">Premium Tier</span>
</div>
<nav class="flex flex-col gap-sm">
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-lg text-label-lg">Dashboard</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">analytics</span>
<span class="font-label-lg text-label-lg">Match Predictor</span>
</a>
<a class="flex items-center gap-md p-md bg-primary-container text-on-primary-container rounded-lg font-bold" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">sports_soccer</span>
<span class="font-label-lg text-label-lg">Golden Boot</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">front_hand</span>
<span class="font-label-lg text-label-lg">Golden Glove</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">psychology</span>
<span class="font-label-lg text-label-lg">Match Simulator</span>
</a>
<a class="flex items-center gap-md p-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">trophy</span>
<span class="font-label-lg text-label-lg">Tournament Simulator</span>
</a>
</nav>
</aside>
<!-- Main Content -->
<main class="md:ml-64 mt-16 p-lg pb-32 max-w-container-max mx-auto">
<!-- Hero Selection Card -->
<section class="mb-2xl">
<div class="relative overflow-hidden rounded-xl border border-primary-container bg-gradient-to-br from-surface-container-high to-surface p-xl flex flex-col md:flex-row items-center gap-xl gold-glow">
<div class="absolute inset-0 opacity-10 pointer-events-none">

</div>
<div class="relative z-10 w-48 h-48 rounded-full border-4 border-primary overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="A professional athletic headshot of a world-class soccer player looking intense and determined. The lighting is cinematic with high-contrast shadows and gold rim lighting, against a dark stadium background. The image has a premium, high-stakes sports magazine aesthetic with sharp focus and deep color saturation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Qm-7sc0EsNwJNWxRdlb8ZRtjwWlufSu0kWnWlD4OzBcQvuDFEb2UtZQ30KSLqLF4Z4uXMh03aXOde_txj0JY6bB-P_cYjTMhAY8Uc6bbD8vcAlQteXoTAA3Cjh1c_AxrG9DweAO4JeD8COwDvxabTfx9oW4-FZga10SLO5pETzhuZQBkLHsv_mf8IS8nxcL0w40Q0dEjdWls5SNYM2YxDoAudGTkZsnPkAEutzCRYoQWo5FmpKIHGTZodu42EXYJxGLkGEhUIVc"/>
</div>
<div class="relative z-10 flex-1 text-center md:text-left">
<div class="inline-flex items-center px-sm py-xs rounded bg-primary text-on-primary font-label-md text-label-md mb-sm">
                        CURRENT PICK
                    </div>
<h1 class="font-display-md text-display-md text-on-surface mb-xs">Kylian Mbappé</h1>
<p class="font-body-lg text-body-lg text-primary mb-md">France • Forward</p>
<div class="grid grid-cols-3 gap-md max-w-md">
<div class="bg-surface-container-low p-sm rounded border border-outline-variant/30">
<span class="block font-label-md text-label-md text-on-surface-variant opacity-70">Projected Goals</span>
<span class="block font-headline-sm text-headline-sm text-primary">7.2</span>
</div>
<div class="bg-surface-container-low p-sm rounded border border-outline-variant/30">
<span class="block font-label-md text-label-md text-on-surface-variant opacity-70">Confidence</span>
<span class="block font-headline-sm text-headline-sm text-tertiary">94%</span>
</div>
<div class="bg-surface-container-low p-sm rounded border border-outline-variant/30">
<span class="block font-label-md text-label-md text-on-surface-variant opacity-70">Odds</span>
<span class="block font-headline-sm text-headline-sm text-secondary">3.50</span>
</div>
</div>
</div>
</div>
</section>
<!-- Search & Filters -->
<section class="mb-xl flex flex-col md:flex-row gap-lg items-end">
<div class="flex-1 w-full">
<label class="block font-label-lg text-label-lg mb-sm text-on-surface-variant">Search Players</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full bg-surface-container-high border-none rounded-lg py-md pl-12 pr-md focus:ring-2 focus:ring-primary text-on-surface" placeholder="Search by name, team or position..." type="text"/>
</div>
</div>
<div class="flex gap-sm">
<button class="bg-surface-container-high px-lg py-md rounded-lg font-label-lg text-label-lg text-primary border border-primary/20">All Positions</button>
<button class="bg-surface-container px-lg py-md rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-variant transition-colors">Favorites</button>
<button class="bg-surface-container px-lg py-md rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-variant transition-colors">By Team</button>
</div>
</section>
<!-- Player Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
<!-- Player Card 1 (Selected) -->
<div class="glass-panel p-md rounded-xl cursor-pointer hover:border-primary transition-all duration-300 player-card-selected group relative" onclick="selectPlayer(this)">
<div class="absolute top-md right-md bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center opacity-100 transition-opacity">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'wght' 700;">check</span>
</div>
<div class="flex items-center gap-md mb-md">
<div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="Close-up portrait of a famous soccer player with a focused gaze. Cinematic studio lighting with warm highlights and deep shadows. The aesthetic matches a high-end sports app with sharp clarity and professional grading." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzoAG6oHG9lqPVANhqAdSNNp5F4rTEoj2TWP7CyCNuPrX868DBaswS8kT-Y11bNpOnAJrOFj93K1mm5HOGKRMH_KSXlfxOupYXS8l1gIrp5LRe4dp_5UzK2aE1TFf7CIYfETnYCu5A-jilJ933qsWFAOi6dChXknL26e1H8nkIQNza9lwPjMoHvQxmo5SirAB3QW-K51PQsHxPejskPMagZlnQCET5gvmFvjiIUR2CACFnjjXbFVXgcSaCZawGHv8q9EYkiM9LHW8"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Kylian Mbappé</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">France • PSG</p>
</div>
</div>
<div class="flex justify-between items-end gap-md">
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md mb-xs">
<span class="text-on-surface-variant">AI Confidence</span>
<span class="text-tertiary">94%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary" style="width: 94%"></div>
</div>
</div>
<div class="text-right">
<span class="block font-label-md text-label-md text-on-surface-variant">Goals/90</span>
<span class="block font-headline-sm text-headline-sm text-primary">1.12</span>
</div>
</div>
</div>
<!-- Player Card 2 -->
<div class="glass-panel p-md rounded-xl cursor-pointer hover:border-primary transition-all duration-300 group relative border-transparent" onclick="selectPlayer(this)">
<div class="absolute top-md right-md bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-40">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'wght' 700;">check</span>
</div>
<div class="flex items-center gap-md mb-md">
<div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="Dynamic portrait of an elite professional football player. Night stadium lighting with vibrant blue and gold accents. The photography style is sharp, detailed, and highly professional, suitable for a premium analytical sports platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo95BpFCrA2BqUJIPddj7nNQjEFWFjN4fJ4eMPKmoJB3ei2oLUdxRI8sWYlk3rKAlMF5fvY_857qjEET5TVi-uWKVhrZCq8oYKEeB_KPYAuu4toSWb-oNilIBJJ3Hdgi6fLbHgStMm1Ile4BYP1RHrnRHPC6ra6VjMcljt6J2meeSyLkPX95y3iTAp52FIEjFDDjdB-DWYsJpSkj-ZCsSUwRicRBBMBYsloLmikaI_rTeDLz168fW99RD60Ja3IY-3jGAKuFR9v3o"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Erling Haaland</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Norway • Man City</p>
</div>
</div>
<div class="flex justify-between items-end gap-md">
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md mb-xs">
<span class="text-on-surface-variant">AI Confidence</span>
<span class="text-tertiary">89%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary" style="width: 89%"></div>
</div>
</div>
<div class="text-right">
<span class="block font-label-md text-label-md text-on-surface-variant">Goals/90</span>
<span class="block font-headline-sm text-headline-sm text-primary">1.28</span>
</div>
</div>
</div>
<!-- Player Card 3 -->
<div class="glass-panel p-md rounded-xl cursor-pointer hover:border-primary transition-all duration-300 group relative border-transparent" onclick="selectPlayer(this)">
<div class="absolute top-md right-md bg-primary text-on-primary w-6 h-6 rounded-full flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-40">
<span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'wght' 700;">check</span>
</div>
<div class="flex items-center gap-md mb-md">
<div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="Dramatic high-key profile of a champion soccer player. Background features blurred stadium lights at night. The image exudes prestige and performance, using a dark nocturnal color palette with sharp gold highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBysYurKjEm4oGjJn5D3mBkEhQwfymml8nNy91ybHgw9GpeE8fBqs2ZtJcoUE4Sqs6564ONdaRrpUGxM1_XRPcC2zr2AFBDxCxmxqyQOWaHjbXnQ9IiB8TFWVUy1krr1F0TEZhnPK8wbCpZg5GZo6Y1K1UMhC-LCiohlF01I4ZYz_A4YnjdUUhxKGcgw2EZxLEqv7sOXJVUGbad8Jd9BvJ_smLCkScAWQNw6Cts1tpSDZn96NjJXF0rx1hiJaKAsacfX8qJVsNvnow"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Harry Kane</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">England • Bayern</p>
</div>
</div>
<div class="flex justify-between items-end gap-md">
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md mb-xs">
<span class="text-on-surface-variant">AI Confidence</span>
<span class="text-tertiary">82%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary" style="width: 82%"></div>
</div>
</div>
<div class="text-right">
<span class="block font-label-md text-label-md text-on-surface-variant">Goals/90</span>
<span class="block font-headline-sm text-headline-sm text-primary">0.94</span>
</div>
</div>
</div>
<!-- Repeat for more players (simulated grid density) -->
<div class="glass-panel p-md rounded-xl cursor-pointer hover:border-primary transition-all duration-300 group relative border-transparent" onclick="selectPlayer(this)">
<div class="flex items-center gap-md mb-md">
<div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="Athletic action headshot of a top-tier striker. Atmospheric dark studio setting with intense contrast and professional sports lighting. Sharp focus on the athlete's eyes, conveying deep concentration and elite skill." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt6dwb_jBaV6w1thsMXT367EqAmNFdqDPyaSqsPFnP-IFt7-ydEqyOvh_3yXRgBn5Stq-FIc7t30NhWr6VHqVrSU7lU2R6HdullDmxLu1g0BhClKwn3jEE_IdOIk9BKER5OUXwhOWRUm_oCwId5WxikjaSp6ASBdK60zDsp3Fg6qmcNNsfprg1DJp25hCotuIATbVYE4OF_4LNc_445B2rKARd_E5fWTYD3ikBvza273qqsryqTkaYP4pLVpdwyAwZd62jAa01Zec"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Vinícius Jr.</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Brazil • Real Madrid</p>
</div>
</div>
<div class="flex justify-between items-end gap-md">
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md mb-xs">
<span class="text-on-surface-variant">AI Confidence</span>
<span class="text-tertiary">78%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary" style="width: 78%"></div>
</div>
</div>
<div class="text-right">
<span class="block font-label-md text-label-md text-on-surface-variant">Goals/90</span>
<span class="block font-headline-sm text-headline-sm text-primary">0.86</span>
</div>
</div>
</div>
<div class="glass-panel p-md rounded-xl cursor-pointer hover:border-primary transition-all duration-300 group relative border-transparent" onclick="selectPlayer(this)">
<div class="flex items-center gap-md mb-md">
<div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="Portrait of a young soccer prodigy under stadium spotlights. The background is a velvety dark navy. The lighting creates a prestigious, high-stakes aesthetic with sharp focus on the player's features." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmgSpqKhUwRG0YBlEHVTjfrJWgGLqrkiqwKzk5rDZ7y73IHLY9Mci9sF9jj1YvXOJSOq2L0_h1q1FNKvjDS3urzcKVk_0FjUqdvPyye6lvXVLnCNs5X1rYQd-w0z3Vh68SqRjBHZqQNugGEP8pZjXo4TyBiJRx6K1vIZyU7GRGCGeaKYhWcVicqJQQ12AuuodcuUX_LKZRzaZAzj5ROt85CuqaZDfuRktYDei8eIyOnQLdJ8HFuI38_gfKB-i-X-7qQF43im42vaY"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Jude Bellingham</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">England • Real Madrid</p>
</div>
</div>
<div class="flex justify-between items-end gap-md">
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md mb-xs">
<span class="text-on-surface-variant">AI Confidence</span>
<span class="text-tertiary">71%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary" style="width: 71%"></div>
</div>
</div>
<div class="text-right">
<span class="block font-label-md text-label-md text-on-surface-variant">Goals/90</span>
<span class="block font-headline-sm text-headline-sm text-primary">0.68</span>
</div>
</div>
</div>
<div class="glass-panel p-md rounded-xl cursor-pointer hover:border-primary transition-all duration-300 group relative border-transparent" onclick="selectPlayer(this)">
<div class="flex items-center gap-md mb-md">
<div class="w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest">
<img class="w-full h-full object-cover" data-alt="A striking portrait of a world-class midfielder. High-stakes sports aesthetic with dramatic lighting and a nocturnal stadium color palette. Professional photography emphasizing clarity and prestige." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Hcj3s8EeIOlaYFwSUCRh1V4w0CYuKT_1xX-xNvEoFNudbxCu49_NpfX-YihKXA5VqgWYdAl1SvJhy8r7kYWOKyQX2B4oOjJnLUzYLxCfBCsVB7-0aA30zHh5oRwEmBX3b5dPL7AcIipTY88YGqU2I-ljm0nMgeN9nlX7it7C_7VI0As_-T2CsRlG-fPu1YdZMHmQoPRdQwZakJuJeOpgjrl3jzIzco4mDKxybKL3Su4ET7GMjOUaOA2QhZStvSxdcLvJtZmlVbI"/>
</div>
<div>
<h3 class="font-headline-sm text-headline-sm text-on-surface">Lautaro Martínez</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Argentina • Inter Milan</p>
</div>
</div>
<div class="flex justify-between items-end gap-md">
<div class="flex-1">
<div class="flex justify-between font-label-md text-label-md mb-xs">
<span class="text-on-surface-variant">AI Confidence</span>
<span class="text-tertiary">65%</span>
</div>
<div class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-tertiary" style="width: 65%"></div>
</div>
</div>
<div class="text-right">
<span class="block font-label-md text-label-md text-on-surface-variant">Goals/90</span>
<span class="block font-headline-sm text-headline-sm text-primary">0.79</span>
</div>
</div>
</div>
</section>
</main>
<!-- Sticky Submit Bar -->
<footer class="fixed bottom-0 w-full bg-surface-container-highest/90 backdrop-blur-md border-t border-outline-variant py-md z-50">
<div class="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md">
<div class="hidden md:flex items-center gap-md">
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-surface bg-primary"></div>
<div class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high"></div>
<div class="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high"></div>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant">1,240 analysts have made their prediction</span>
</div>
<div class="flex items-center gap-xl w-full md:w-auto">
<div class="flex flex-col text-right">
<span class="font-label-md text-label-md text-on-surface-variant">Selected Pick</span>
<span class="font-label-lg text-label-lg text-primary font-bold">Kylian Mbappé</span>
</div>
<button class="flex-1 md:flex-none bg-primary hover:bg-primary-fixed-dim text-background font-label-lg text-label-lg px-2xl py-md rounded-lg font-bold transition-all duration-300 gold-glow active:scale-95 shadow-lg">
                    SUBMIT PREDICTION
                </button>
</div>
</div>
</footer>
<!-- Main Footer (Bottom of page content) -->
<footer class="md:ml-64 bg-surface-container-lowest border-t border-outline-variant w-full py-xl">
<div class="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-lg">
<span class="font-headline-sm text-headline-sm text-on-surface">⚽ World Cup 2026</span>
<div class="flex gap-lg">
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Privacy Policy</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Terms of Service</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">API Docs</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Contact Support</a>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">© 2026 AI World Cup Predictor. All rights reserved.</p>
</div>
</footer>
<script>
        function selectPlayer(element) {
            // Remove selection from all cards
            document.querySelectorAll('.glass-panel').forEach(card => {
                card.classList.remove('player-card-selected', 'border-primary');
                card.classList.add('border-transparent');
                const check = card.querySelector('.absolute.top-md');
                if (check) check.classList.add('opacity-0');
            });

            // Add selection to clicked card
            element.classList.add('player-card-selected');
            element.classList.remove('border-transparent');
            const check = element.querySelector('.absolute.top-md');
            if (check) {
                check.classList.remove('opacity-0');
                check.classList.add('opacity-100');
            }

            // Update sticky footer text (simulated)
            const playerName = element.querySelector('h3').textContent;
            document.querySelector('.font-label-lg.text-primary.font-bold').textContent = playerName;
        }

        // Simple parallax for glass effect
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.glass-panel');
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;

                const angleX = (mouseY - cardY) / 50;
                const angleY = (cardX - mouseX) / 50;

                if (card.classList.contains('hover:border-primary')) {
                    // card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                }
            });
        });
    </script>
</body></html>