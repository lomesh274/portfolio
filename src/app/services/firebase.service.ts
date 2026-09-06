import { Injectable } from '@angular/core';
import { PortfolioData, Project, Experience, Skill } from '../data/portfolio-data';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCDq8v27e0_9CNz4xy1ezoz_lZlFMEPB_Y",
  authDomain: "e-commers-82209.firebaseapp.com",
  projectId: "e-commers-82209",
  storageBucket: "e-commers-82209.firebasestorage.app",
  messagingSenderId: "1080257295330",
  appId: "1:1080257295330:web:77c37182904da4f9373fbb",
  measurementId: "G-0TPLZ0NEWG"
};

const BASE_FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents`;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  /**
   * Load live portfolio data from Cloud Firestore
   */
  async loadPortfolioFromFirebase(): Promise<PortfolioData | null> {
    try {
      const response = await fetch(`${BASE_FIRESTORE_URL}/portfolio/data`);
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Firebase document does not exist yet. Will create on first save.');
          return null;
        }
        throw new Error(`Firebase response error status: ${response.status}`);
      }

      const doc = await response.json();
      if (doc && doc.fields && doc.fields.jsonValue && doc.fields.jsonValue.stringValue) {
        const parsed = JSON.parse(doc.fields.jsonValue.stringValue);
        return parsed as PortfolioData;
      }
      return null;
    } catch (err) {
      console.warn('Could not load from Firebase Firestore (using preset fallback):', err);
      return null;
    }
  }

  /**
   * Create or Update live portfolio data in Cloud Firestore (both unified document and sub-collections)
   */
  async savePortfolioToFirebase(data: PortfolioData): Promise<boolean> {
    try {
      // 1. Save unified portfolio/data document
      const body = {
        fields: {
          jsonValue: { stringValue: JSON.stringify(data) },
          updatedAt: { stringValue: new Date().toISOString() }
        }
      };

      const response = await fetch(`${BASE_FIRESTORE_URL}/portfolio/data`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Firebase save error status: ${response.status}`);
      }

      // 2. Also populate individual collections (projects, experiences, skills) in Firestore
      await this.pushCollectionsToFirestore(data);

      console.log('Successfully saved portfolio data & collections to Cloud Firestore!');
      return true;
    } catch (err) {
      console.error('Failed to save to Cloud Firestore:', err);
      return false;
    }
  }

  /**
   * Push projects, experiences, and skills as individual Firestore documents
   */
  private async pushCollectionsToFirestore(data: PortfolioData) {
    try {
      // Save projects to 'projects' collection
      for (const p of data.projects) {
        const pDoc = {
          fields: {
            title: { stringValue: p.title },
            shortDescription: { stringValue: p.shortDescription },
            fullDescription: { stringValue: p.fullDescription },
            category: { stringValue: p.category },
            imageUrl: { stringValue: p.imageUrl },
            demoUrl: { stringValue: p.demoUrl || '' },
            tags: {
              arrayValue: {
                values: p.tags.map(t => ({ stringValue: t }))
              }
            }
          }
        };
        await fetch(`${BASE_FIRESTORE_URL}/projects/${p.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pDoc)
        });
      }

      // Save experiences to 'experiences' collection
      for (const exp of data.experiences) {
        const expDoc = {
          fields: {
            role: { stringValue: exp.role },
            company: { stringValue: exp.company },
            location: { stringValue: exp.location },
            period: { stringValue: exp.period },
            description: { stringValue: exp.description },
            achievements: {
              arrayValue: {
                values: exp.achievements.map(a => ({ stringValue: a }))
              }
            },
            technologies: {
              arrayValue: {
                values: exp.technologies.map(t => ({ stringValue: t }))
              }
            }
          }
        };
        await fetch(`${BASE_FIRESTORE_URL}/experiences/${exp.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expDoc)
        });
      }
    } catch (e) {
      console.warn('Sub-collections sync notice:', e);
    }
  }
}
