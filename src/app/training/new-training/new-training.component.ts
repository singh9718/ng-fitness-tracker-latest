import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from "../training.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Exercise } from "../exercise.model";

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    //@ts-ignore
    exercises: Exercise[];
    exerciseSubscription: Subscription = new Subscription();

    constructor(
        private trainingService: TrainingService,
    ) {
    }

    ngOnInit() {
        this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
            exercises => (this.exercises = exercises)
        );
        this.trainingService.fetchAvailableExercises();
    }

    ngOnDestroy() {
        this.exerciseSubscription.unsubscribe();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

}
