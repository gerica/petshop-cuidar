import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
@Directive({
  selector: '[inputMaskCurrent]'
})

export class InputMaskCurrentDirective {


	@Input('inputMaskCurrent') inputMaskCurrent: string;	

	constructor(private el: ElementRef, private renderer: Renderer) { }

	@HostListener('keyup') onKeyUp() {
		console.log("up "+this.inputMaskCurrent);
		// console.log("up "+this.inputMaskCurrent.event);
		// console.log(this.el.nativeElement.value);		
		this.validadeNumber();
	}

    private validadeNumber(): void {
        console.log(this.inputMaskCurrent);                
        if (this.inputMaskCurrent === '1') {
            this.el.nativeElement.value = this.inputMaskCurrent;
        } else {
        	this.el.nativeElement.value = '';
        }        

    }
}

