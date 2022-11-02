import { Component, OnInit,ViewChild } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';


@Component({
  selector: 'app-email-configurations',
  templateUrl: './email-configurations.component.html',
  styleUrls: ['./email-configurations.component.css']
})
export class EmailConfigurationsComponent implements OnInit {

  @ViewChild(EmailEditorComponent)
  private emailEditor: EmailEditorComponent = new EmailEditorComponent();

  constructor() { }

  ngOnInit(): void {
  }

  // called when the editor is created
  editorLoaded(value:any) {
    console.log('editorLoaded');
    // load the design json here
    // this.emailEditor.editor.loadDesign({});
  }

  // called when the editor has finished loading
  editorReady(value:any) {
    console.log('editorReady');
  }

  exportHtml() {
    this.emailEditor.editor.exportHtml((data: any) =>
      console.log('exportHtml', data)
    );
  }

}
