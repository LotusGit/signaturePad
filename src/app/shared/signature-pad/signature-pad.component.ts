import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-signature-pad',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './signature-pad.component.html',
  styleUrl: './signature-pad.component.css'
})
export class SignaturePadComponent {
  formulaire!: FormGroup;
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  constructor(private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.formulaire = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)){
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    }
  }

  clearPad() {
    this.formulaire.reset();
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
      console.log(base64Data);
    }
  }

  onSubmit() {
    console.log(this.formulaire.value);
  }
}
