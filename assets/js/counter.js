const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                startCounting(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const section = document.querySelector('#counters');
observer.observe(section);

function startCounting(counterElement) {
    counterElement.classList.add('highlighted');
    const target = parseInt(counterElement.getAttribute('data-target'));
    const suffix = target === 10 || target === 33 ? '%' : '';
    const suffix2 = target === 2500 ? 'L' : '';
    const suffix3 = target === 111 ? 'M' : '';

    const duration = 2500;
    const steps = 50;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(interval);
            current = target;
        }

        if (target >= 100) {
            counterElement.textContent = Math.round(current) + suffix2 + suffix3;
        } else {
            counterElement.textContent = current.toFixed(1).replace(/\.0$/, '') + suffix + suffix2 + suffix3;
        }

        if (current >= target) {
            counterElement.classList.remove('text-muted');
            counterElement.classList.add('text-success');
        }
    }, duration / steps);
}