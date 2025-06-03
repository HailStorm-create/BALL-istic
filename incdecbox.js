class IncDecBox {
    constructor(x, y, initialValue, minVal, maxVal, message, length) {
      this.x = x;
      this.y = y;
      this.value = initialValue;
      this.minVal = minVal;
      this.maxVal = maxVal;
      this.message = message;
      this.length = length;
    }
  
    increment() {
      if (this.value < this.maxVal) {
        this.value++;
      }
    }
  
    decrement() {
      if (this.value > this.minVal) {
        this.value--;
      }
    }
  
    draw(ctx) {
      // Background box
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x - this.length / 2 - 6, this.y - 18, this.length + 12, 30);
      
      // Text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = '16px Arial';
      ctx.fillText(`${this.message} ${this.value}`, this.x, this.y + 5);
  
      // Button Styles
      ctx.fillStyle = 'rgb(255, 165, 0)';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(this.x - this.length / 2 - 22, this.y - 12, 18, 18, 5);
      ctx.fill();
      ctx.stroke();
  
      ctx.beginPath();
      ctx.roundRect(this.x + this.length / 2 + 4, this.y - 12, 18, 18, 5);
      ctx.fill();
      ctx.stroke();
  
      // Button Text
      ctx.fillStyle = 'white';
      ctx.fillText('-', this.x - this.length / 2 - 13, this.y + 4);
      ctx.fillText('+', this.x + this.length / 2 + 12, this.y + 4);
    }
  
    handleEvent(event) {
      if (event.type === 'click') {
        const clickX = event.clientX;
        const clickY = event.clientY;
        
        if (clickX >= this.x - this.length / 2 - 22 && clickX <= this.x - this.length / 2 - 4 && clickY >= this.y - 12 && clickY <= this.y + 6) {
          this.decrement();
        }
        
        if (clickX >= this.x + this.length / 2 + 4 && clickX <= this.x + this.length / 2 + 22 && clickY >= this.y - 12 && clickY <= this.y + 6) {
          this.increment();
        }
      }
    }
  
    getValue() {
      return this.value;
    }
  }
  
