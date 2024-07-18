import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AdminService } from 'src/app/core/services/admin.service';
import { QuestionActionsComponent } from './question-actions/question-actions.component';
import { ToastService } from 'angular-toastify';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

  colDef: ColDef[]= [
    {field : '_id', flex: 1},
    {field: 'question', flex: 2},
    {field: 'options', flex: 2},
    {field: 'answer', flex: 1},
    {field: 'difficulty', flex: 1},
    {field : 'createdAt', flex: 1},
    {field : 'actions', flex: 1, sortable : false, cellRenderer : QuestionActionsComponent, cellRendererParams : {
      delete : (id: string)=> this.delete(id),
      update : (id: string)=> this.update(id)
    }}
  ]

  updateState : boolean = false;
  questionId!: string ;

  @ViewChild('modal') modalButton !: ElementRef;
  update(id: string){
    this.questionId = id;
    this.modalButton.nativeElement.click();
    this.updateState = true;
    this.adminService.getQuestion(id).subscribe((data: any)=>{
      this.questionForm.patchValue({
        question : data.data.question,
        option1 : data.data.options[0],
        option2 : data.data.options[1],
        option3 : data.data.options[2],
        option4 : data.data.options[3],
        answer : data.data.answer,
        difficulty : data.data.difficulty
      })
    });
  }

  updateQuestion(){
    const payload = {
      question : this.questionForm.controls.question.value,
      answer : this.questionForm.controls.answer.value,
      difficulty : this.questionForm.controls.difficulty.value,
      options : [
        this.questionForm.controls.option1.value,
        this.questionForm.controls.option2.value,
        this.questionForm.controls.option3.value,
        this.questionForm.controls.option4.value
      ]
    }

    this.adminService.updateQuestion(this.questionId as string, payload).subscribe((data:any)=>{
      if(data.status === true){
        this.ts.success(data.message);
        this.closeButton.nativeElement.click();
        this.getQuestions();
      }else{
        this.ts.error(data.message);
      }
    })
  }

  delete(id: string){
    this.adminService.deleteQuestion(id as string).subscribe((data: any)=>{
      if(data.status == true){
        this.ts.success(data.message);
        this.getQuestions();
      }else{
        this.ts.error(data.message);
      }
    })
  }

  rowData: any;

  constructor(private adminService: AdminService, private ts: ToastService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.getQuestions();
  }

  getQuestions(){
    this.adminService.getAllQuestion().subscribe((data : any)=>{
      this.rowData = data.data;
    })
  }

  questionForm = this.formBuilder.group({
    question : ['', Validators.required],
    option1 : ['', Validators.required],
    option2 : ['', Validators.required],
    option3 : ['', Validators.required],
    option4 : ['', Validators.required],
    answer : ['', Validators.required],
    difficulty : ['', Validators.required]
  })

  @ViewChild('closeButton') closeButton !: ElementRef;

  addQuestion(){
    const payload = {
      question : this.questionForm.controls.question.value,
      answer : this.questionForm.controls.answer.value,
      difficulty : this.questionForm.controls.difficulty.value,
      options : [
        this.questionForm.controls.option1.value,
        this.questionForm.controls.option2.value,
        this.questionForm.controls.option3.value,
        this.questionForm.controls.option4.value
      ]
    }
    this.adminService.addQuestion(payload).subscribe((data: any)=>{
      if(data.status === true){
        this.ts.success(data.message);
        this.getQuestions();
        this.closeButton.nativeElement.click();
      }else{
        this.ts.error(data.message);
      }
    })
  }

  resetThings(){
    this.questionForm.reset();
    this.updateState = false;
  }
}
