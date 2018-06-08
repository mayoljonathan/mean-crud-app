import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Include Modules so that if we have some routing codes in the components, it will work
import { RouterModule }  from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material Module
import { MaterialModule } from '../../material.module';

// Include here the Reusable Components
import { SideNavComponent } from './';

@NgModule({
	imports: [
		RouterModule,
		FormsModule,
		CommonModule,
		MaterialModule
	],
	declarations: [
		SideNavComponent,
	],
	exports: [
		SideNavComponent,
	]
})
export class ComponentsModule {}
