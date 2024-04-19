import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignaturePadComponent } from './shared/signature-pad/signature-pad.component';
import SignaturePad from 'signature_pad';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SignaturePadComponent]
})
export class AppComponent {
  title = 'signaturePad';
}
