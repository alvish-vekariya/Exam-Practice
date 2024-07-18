import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/core/services/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  constructor(private examService : ExamService, private formBuilder: FormBuilder, private router: Router){}
  questions : any;
  formDefinition = {};
  submitExamForm : any;

  ngOnInit(){
    this.getQuestions();
  }

  getQuestions(){
    this.examService.startQuiz().subscribe((data: any)=>{
      this.questions = data.data;
      this.buildForm();
    })
  }

  buildForm(){
    for(let question of this.questions){
      this.formDefinition = {
        ...this.formDefinition,
        [`${question._id}`] : ['', Validators.required] 
      };
    }
    this.submitExamForm = this.formBuilder.group(this.formDefinition);
  }

  submitExam(){
    this.examService.submitQuiz(this.submitExamForm.value).subscribe((data: any)=>{
      if(data.status === true){
        Swal.fire({
          title : data.score,
          text : 'your score'
        }).then(()=>{
          this.router.navigate(['/user'])
        })
      }else{
        Swal.fire({
          icon: "error",
          text : data.message
        })
      }
    })
  }
  

}
