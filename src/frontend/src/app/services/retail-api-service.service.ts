import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { PersonalDataService } from './personal-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonalData } from '../classes/personal-data';
import { Card } from '@app/classes/card';
import { CardsService } from './cards.service';
import { Check } from '@app/classes/check';
import { ChecksService } from './checks.service';
import { SkuGroup } from '@app/classes/sku-group';
import { SkuGroupsService } from './sku-groups.service';
import { Sku } from '@app/classes/sku';
import { SkuService } from './sku.service';
import { Store } from '@app/classes/store';
import { StoreService } from './stores-service';
import { Transaction } from '@app/classes/transaction';
import { TransactionService } from './transactions.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@app/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RetailApiServiceService {
  personalData: BehaviorSubject<Map<number ,PersonalData>> = new BehaviorSubject<Map<number ,PersonalData>>(new Map<number ,PersonalData>())
  cards: BehaviorSubject<Map<number ,Card>> = new BehaviorSubject<Map<number ,Card>>(new Map<number ,Card>())

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private pDataService: PersonalDataService,
    private cardsService: CardsService,
    private checksService: ChecksService,
    private skuGroupService: SkuGroupsService,
    private skuService: SkuService,
    private storeService: StoreService,
    private transactionService: TransactionService) { }
  //
  // PERSONAL DATA
  //
  fetchPersonalData(): void {
    this.pDataService.getPersonalData().subscribe({
      next: data => {
        const dict = new Map<number ,PersonalData>()

        data.forEach( (element) => {
          dict.set(element.customer_id, element)
      });
        this.personalData.next(dict) 
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
    })
  }

  createPersonalData(personalData: PersonalData): Observable<{}> {
    return this.pDataService.createPersonalData(personalData);
  }

  getPersonalDataById(id: number): Observable<PersonalData> {
    return this.pDataService.getPersonalDataById(id);
  }

  // A method that updates PersonalData
  updatePersonalData(personalData: PersonalData): Observable<PersonalData> {
    return this.pDataService.updatePersonalData(personalData);
  }

  // A method that deletes PersonalData by id
  deletePersonalData(id: number): Observable<{}> {
    return this.pDataService.deletePersonalData(id);
  }
  //
  // CARDS
  //
  // A method that retrieves cards data
  getCards(): Card[] {
    this.cardsService.getCards().subscribe({
      next: data => {
        this.cards = data 
      },
      error: error => {
        this.dialog.open(ErrorDialogComponent, {data: error});
      }
    })
    return this.cards;
  }

  // A method that creates new entry with given data
  createCard(card: Card): Observable<{}> {
    return this.cardsService.createCard(card);
  }

  // A method that gets Card with specific id
  getCardById(id: number): Observable<Card> {
    return this.cardsService.getCardById(id);
  }

  // A method that updates Card
  updateCard(card: Card): Observable<Card> {
    return this.cardsService.updateCard(card);
  }

  // A method that deletes Card by id
  deleteCard(id: number): Observable<{}> {
    return this.cardsService.deleteCard(id);
  }
  //
  // CHECKS
  //
  // A method that retrieves Check data
  getChecks(): Observable<Check[]> {
    return this.checksService.getChecks();
  }

  // A method that creates new entry with given data
  createCheck(check: Check): Observable<{}> {
    return this.checksService.createCheck(check);
  }

  // A method that gets Check with specific id
  getCheckById(id: number): Observable<Check> {
    return this.checksService.getCheckById(id);
  }

  // A method that updates Check
  updateCheck(check: Check): Observable<Check> {
    return this.checksService.updateCheck(check);
  }

  // A method that deletes Check by id
  deleteCheck(id: number): Observable<{}> {
    return this.checksService.deleteCheck(id);
  }
  //
  // SKU GROUP
  //
  // A method that retrieves SkuGroup data
  getSkuGroups(): Observable<SkuGroup[]> {
    return this.skuGroupService.getSkuGroups();
  }

  // A method that creates new entry with given data
  createSkuGroup(skuGroup: SkuGroup): Observable<{}> {
    return this.skuGroupService.createSkuGroup(skuGroup);
  }

  // A method that gets SkuGroup with specific id
  getSkuGroupById(id: number): Observable<SkuGroup> {
    return this.skuGroupService.getSkuGroupById(id);
  }

  // A method that updates SkuGroup
  updateSkuGroup(skuGroup: SkuGroup): Observable<SkuGroup> {
    return this.skuGroupService.updateSkuGroup(skuGroup);
  }

  // A method that deletes SkuGroup by id
  deleteSkuGroup(id: number): Observable<{}> {
    return this.skuGroupService.deleteSkuGroup(id);
  }
  //
  // SKU GROUP
  //
  // A method that retrieves Sku data
  getSkus(): Observable<Sku[]> {
    return this.skuService.getSkus();
  }

  // A method that creates new entry with given data
  createSku(sku: Sku): Observable<{}> {
    return this.skuService.createSku(sku);
  }

  // A method that gets Sku with specific id
  getSkuById(id: number): Observable<Sku> {
    return this.skuService.getSkuById(id);
  }

  // A method that updates Sku
  updateSku(sku: Sku): Observable<Sku> {
    return this.skuService.updateSku(sku);
  }

  // A method that deletes Sku by id
  deleteSku(id: number): Observable<{}> {
    return this.skuService.deleteSku(id);
  }
  //
  // STORES
  //
  // A method that retrieves Store data
  getStores(): Observable<Store[]> {
    return this.storeService.getStores();
  }

  // A method that creates new entry with given data
  createStore(store: Store): Observable<{}> {
    return this.storeService.createStore(store);
  }

  // A method that gets Store with specific id
  getStoreById(id: number): Observable<Store> {
    return this.storeService.getStoreById(id);
  }

  // A method that updates Store
  updateStore(store: Store): Observable<Store> {
    return this.storeService.updateStore(store);
  }

  // A method that deletes Store by id
  deleteStore(id: number): Observable<{}> {
    return this.storeService.deleteStore(id);
  }
  //
  // TRANSACTIONS
  //
  // A method that retrieves Transaction data
  getTransactions(): Observable<Transaction[]> {
    return this.transactionService.getTransactions();
  }

  // A method that creates new entry with given data
  createTransaction(transaction: Transaction): Observable<{}> {
    return this.transactionService.createTransaction(transaction);
  }

  // A method that gets Transaction with specific id
  getTransactionById(id: number): Observable<Transaction> {
    return this.transactionService.getTransactionById(id);
  }

  // A method that updates Transaction
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.transactionService.updateTransaction(transaction);
  }

  // A method that deletes Transaction by id
  deleteTransaction(id: number): Observable<{}> {
    return this.transactionService.deleteTransaction(id);
  }
}

