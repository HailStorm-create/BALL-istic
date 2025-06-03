class Slider {
  constructor(x, y, width, minVal, maxVal, initialVal, rounding, message, fontSize) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.minVal = minVal;
      this.maxVal = maxVal;
      this.value = initialVal;
      this.handleX = x + ((initialVal - minVal) / (maxVal - minVal)) * width;
      this.dragging = false;
      this.rounding = rounding;
      this.message = message;
      this.Font = fontSize
  }

  draw(ctx, val) {
      let dynamicColor = GlowEffect.checked ? getCyclingColor() : 'white';

      ctx.font = `${this.Font}px Arial`; // Set the font size
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(this.message, this.x + this.width / 2, this.y - 30);
      
      ctx.strokeStyle = dynamicColor;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.width, this.y);
      ctx.stroke();
      
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      ctx.arc(this.handleX, this.y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.fillText(val, this.handleX, this.y - 10);
  }

  handleEvent(event) {
      if (event.type === 'mousedown' && Math.abs(event.clientX - this.handleX) < 10 && Math.abs(event.clientY - this.y) < 20) {
          this.dragging = true;
      }
      if (event.type === 'mouseup') {
          this.dragging = false;
      }
      if (event.type === 'mousemove' && this.dragging) {
          this.handleX = Math.max(this.x, Math.min(event.clientX, this.x + this.width));
          this.value = this.minVal + ((this.handleX - this.x) / this.width) * (this.maxVal - this.minVal);
      }
  }

  getValue() {
      return this.rounding === 0 ? Math.round(this.value * 100) / 100 : Math.round(this.value);
  }
}
