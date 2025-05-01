import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  projectList = signal([{name: 'The Gm10', description:`GM10 has created the first social platform for collectibles. The platform makes collecting simple, social, and fun for every collector. Whether you’re buying, selling, grading, showing off your collection, looking for local shops or events, GM10 has you covered! This is the ultimate space for collectors, investors, and innovators to connect, grow, and dive deeper into the hobby. Discover hidden gems, relive the nostalgia, and explore exciting new ways to get the most out of your cards and collectibles. Ready to join the community and build something unforgettable?`, startDate:'03-Mar-2023', lastWorkDate: '06-Mar-2025'},{name: 'FVRD TV', description:` FVRD TV is changing the game when it comes to streaming. We believe in supporting the next generation of creators, entrepreneurs, and small businesses. Our live and on demand channels offer a platform for new and emerging talent to showcase their skills and connect with their audience. Our content is carefully curated to ensure a unique and engaging experience, providing a fresh perspective on traditional television. We strive to create a community where talent and fans can come together, providing a new and exciting way to discover your new favorite artist, content creator, gamer, trainer, athlete or business. If you are a content creator looking to host your content on FVRD TV, submit by clicking on the upload button below.`, startDate:'03-Feb-2022', lastWorkDate: '06-Mar-2025'}])

}
