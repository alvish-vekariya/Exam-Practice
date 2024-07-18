import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { QuestionActionsComponent } from './questions/question-actions/question-actions.component';
import { UserActionsComponent } from './users/user-actions/user-actions.component';
import { ProfilesComponent } from './users/profiles/profiles.component';
import { HistoryComponent } from './users/history/history.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuestionsComponent,
    UsersComponent,
    HomeComponent,
    QuestionActionsComponent,
    UserActionsComponent,
    ProfilesComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
