import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../service/review.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Output() reviewSubmitted = new EventEmitter<any>();
  @Input() productId: string = '';
  newReviewContent: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  feedbackSubmitted = false;
  notificationMessage: string = '';

  constructor(private reviewService: ReviewService) { }

  setRating(newRating: number): void {
    this.rating = newRating;
  }
  submitReview() {
    if (this.newReviewContent && this.rating) {
      const newReview = {
        content: this.newReviewContent,
        rating: this.rating
      };

      this.reviewService.addReview(this.productId, newReview).subscribe({
        next: review => {
          this.reviewSubmitted.emit(review);
          this.newReviewContent = '';
          this.rating = 0;
          this.feedbackSubmitted = true;
          this.notificationMessage = "Success: Your review has been submitted!";
          this.showMessage(this.notificationMessage);
        },
        error: error => {
          this.feedbackSubmitted = false;
          console.error('Error submitting review:', error);
          this.notificationMessage = "Error: There was an issue submitting your review.";
          this.showMessage(this.notificationMessage);
        }
      });
    } else {
      this.notificationMessage = "Please complete all fields before submitting.";
      this.showMessage(this.notificationMessage);
    }
  }

  showMessage(message: string): void {
    const snackbar = document.getElementById("snackbar");
    if (snackbar) {
      snackbar.textContent = message;
      snackbar.className = "show";
      setTimeout(() => {
        snackbar.className = snackbar.className.replace("show", "");
      }, 2000);
    }
  }
}
