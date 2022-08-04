class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v){
		return new Vector2(this.x + v.x, this.y + v.y);
	}

	subtract(v){
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	reverseSubtract(v){
		return new Vector2(v.x - this.x, v.y - this.y);
	}

	scale(m){
		return new Vector2(this.x * m, this.y * m);
	}

	copy(){
		let v = new Vector2(this.x, this.y);
		return v;
	}

	toString(){
		return `(${this.x}, ${this.y})`;
	}
}
