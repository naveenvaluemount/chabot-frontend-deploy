import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor( )
    {
    
    }
}
