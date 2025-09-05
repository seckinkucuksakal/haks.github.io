class Globe3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        this.RADIUS = 22; // Increased from 18
        this.NB_SECTIONS = 8;
        this.LINE_WIDTH = 1.3; // Slightly increased line width
        
        this.setupCanvas();
        this.setupMath();
        this.render();
    }
    
    setupCanvas() {
        const SCALE = window.devicePixelRatio || 1;
        const width = this.RADIUS * 2 + 10; // Increased padding
        const height = this.RADIUS * 2 + 10;
        
        this.canvas.width = width * SCALE;
        this.canvas.height = height * SCALE;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        
        this.ctx.scale(SCALE, SCALE);
        this.ctx.lineCap = 'round';
        
        this.width = width;
        this.height = height;
    }
    
    setupMath() {
        const {cos, sin, sqrt, acos, atan2, abs, PI} = Math;
        this.cos = cos;
        this.sin = sin;
        this.sqrt = sqrt;
        this.acos = acos;
        this.atan2 = atan2;
        this.abs = abs;
        this.PI = PI;
        
        this.clamp = (a, b, x) => x < a ? a : x > b ? b : x;
        this.vec = (x = 0, y = 0, z = 0) => ({x, y, z});
        this.vec.set = (o, x = 0, y = 0, z = 0) => {
            o.x = x;
            o.y = y;
            o.z = z;
            return o;
        };
        
        this.X = this.vec(1, 0, 0);
        this.Y = this.vec(0, 1, 0);
        this.Z = this.vec(0, 0, 1);
        
        this._p = this.vec();
        this._n = this.vec();
    }
    
    project(o, {x, y, z}) {
        let ct = this.cos(this.theta), st = this.sin(this.theta);
        let cp = this.cos(this.phi), sp = this.sin(this.phi);
        let a = x * ct + y * st;
        return this.vec.set(o, y * ct - x * st, cp * z - sp * a, cp * a + sp * z);
    }
    
    drawSection(n, o = 0) {
        let {x, y, z} = this.project(this._p, n);
        let a = this.atan2(y, x);
        let ry = this.sqrt(1 - o * o);
        let rx = ry * this.abs(z);
        let W = this.sqrt(x * x + y * y);
        let sa = this.acos(this.clamp(-1, 1, o * (1 / W - W) / rx));
        let sb = z > 0 ? 2 * this.PI - sa : -sa;
        
        this.ctx.beginPath();
        this.ctx.ellipse(x * o * this.RADIUS, y * o * this.RADIUS, rx * this.RADIUS, ry * this.RADIUS, a, sa, sb, z <= 0);
        this.ctx.stroke();
    }
    
    drawArcs() {
        // Only great circles (around Z axis)
        for (let i = this.NB_SECTIONS; i--;) {
            let a = i / this.NB_SECTIONS * this.PI;
            this.drawSection(this.vec.set(this._n, this.cos(a), this.sin(a)));
        }
        
        // Only latitude lines (no X and Y sections)
        for (let i = this.NB_SECTIONS - 1; i--;) {
            let a = (i + 1) / this.NB_SECTIONS * this.PI;
            this.drawSection(this.Z, this.cos(a));
        }
    }
    
    render() {
        requestAnimationFrame(() => this.render());
        
        this.theta = performance.now() / 6000 * this.PI;
        this.phi = 0; // Remove vertical rotation, keep it horizontal
        
        // Clear and setup
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.translate(this.width >> 1, this.height >> 1);
        this.ctx.scale(1, -1);
        
        // Draw sphere border
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = this.LINE_WIDTH + 0.5;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.RADIUS, 0, 2 * this.PI);
        this.ctx.stroke();
        
        // Draw front arcs only (no back arcs, no gradients)
        this.ctx.lineWidth = this.LINE_WIDTH;
        this.ctx.strokeStyle = '#333';
        this.drawArcs();
        
        this.ctx.restore();
    }
}

// Initialize globe when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const globeCanvas = document.getElementById('globeCanvas');
    if (globeCanvas) {
        new Globe3D('globeCanvas');
    }
});
