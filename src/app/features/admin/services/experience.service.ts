import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Experience } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private firestore = inject(Firestore);
  private experienceCollection = collection(this.firestore, 'experience');

  // Get all experience entries
  getAllExperience(): Observable<Experience[]> {
    const q = query(
      this.experienceCollection,
      orderBy('startDate', 'desc')
    );
    
    return from(getDocs(q)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...data,
            startDate: data.startDate?.toDate() || new Date(),
            endDate: data.endDate?.toDate()
          } as Experience;
        });
      })
    );
  }

  // Get single experience by ID
  getExperienceById(id: string): Observable<Experience | null> {
    const experienceDoc = doc(this.firestore, 'experience', id);
    
    return from(getDoc(experienceDoc)).pipe(
      map(doc => {
        if (!doc.exists()) return null;
        
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          startDate: data.startDate?.toDate() || new Date(),
          endDate: data.endDate?.toDate()
        } as Experience;
      })
    );
  }

  // Create new experience
  createExperience(experience: Omit<Experience, 'id'>): Observable<string> {
    return from(addDoc(this.experienceCollection, experience)).pipe(
      map(docRef => docRef.id)
    );
  }

  // Update experience
  updateExperience(id: string, experience: Partial<Experience>): Observable<void> {
    const experienceDoc = doc(this.firestore, 'experience', id);
    return from(updateDoc(experienceDoc, experience));
  }

  // Delete experience
  deleteExperience(id: string): Observable<void> {
    const experienceDoc = doc(this.firestore, 'experience', id);
    return from(deleteDoc(experienceDoc));
  }
}
