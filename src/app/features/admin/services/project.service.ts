import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private firestore = inject(Firestore);
  private projectsCollection = collection(this.firestore, 'projects');

  // Get all projects (admin view - includes unpublished)
  getAllProjects(): Observable<Project[]> {
    return from(getDocs(this.projectsCollection)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate()
          } as Project;
        });
      })
    );
  }

  // Get published projects only (public view)
  getPublishedProjects(): Observable<Project[]> {
    const q = query(
      this.projectsCollection,
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    return from(getDocs(q)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate()
          } as Project;
        });
      })
    );
  }

  // Get featured projects
  getFeaturedProjects(): Observable<Project[]> {
    const q = query(
      this.projectsCollection,
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(6)
    );
    
    return from(getDocs(q)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const data = doc.data() as any;
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate()
          } as Project;
        });
      })
    );
  }

  // Get single project by ID
  getProjectById(id: string): Observable<Project | null> {
    const projectDoc = doc(this.firestore, 'projects', id);
    
    return from(getDoc(projectDoc)).pipe(
      map(doc => {
        if (!doc.exists()) return null;
        
        const data = doc.data() as any;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate()
        } as Project;
      })
    );
  }

  // Create new project
  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Observable<string> {
    const projectData = {
      ...project,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return from(addDoc(this.projectsCollection, projectData)).pipe(
      map(docRef => docRef.id)
    );
  }

  // Update project
  updateProject(id: string, project: Partial<Project>): Observable<void> {
    const projectDoc = doc(this.firestore, 'projects', id);
    const projectData = {
      ...project,
      updatedAt: new Date()
    };

    return from(updateDoc(projectDoc, projectData));
  }

  // Delete project
  deleteProject(id: string): Observable<void> {
    const projectDoc = doc(this.firestore, 'projects', id);
    return from(deleteDoc(projectDoc));
  }

  // Toggle published status
  togglePublished(id: string, published: boolean): Observable<void> {
    const projectDoc = doc(this.firestore, 'projects', id);
    return from(updateDoc(projectDoc, { published, updatedAt: new Date() }));
  }

  // Toggle featured status
  toggleFeatured(id: string, featured: boolean): Observable<void> {
    const projectDoc = doc(this.firestore, 'projects', id);
    return from(updateDoc(projectDoc, { featured, updatedAt: new Date() }));
  }
}
