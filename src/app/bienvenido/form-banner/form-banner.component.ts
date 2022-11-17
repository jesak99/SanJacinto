import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Banner } from 'src/app/model/banner.model';
import { BienvenidaService } from 'src/app/service/bienvenida.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.component.html',
  styleUrls: ['./form-banner.component.scss']
})
export class FormBannerComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  banners !: Banner[];
  banner ?: Banner;

  public imagePath?:string;
  imgURL: any;
  public message?: string;

  form !: FormGroup;
  editMode=false;
  codigo!:string;
  posicion!:number;
  clase!:string;

  constructor(private bienvenidaService: BienvenidaService) { }

  ngOnInit(): void {
    this.banners = this.bienvenidaService.getBanners();
    this.bienvenidaService.newBienvenida.subscribe((banners : Banner)=>{
      this.banners = this.bienvenidaService.getBanners();
    });

    let imagen='';
    let titulo='';
    let descripcion='';
    let color='';

    this.form = new FormGroup({
      imagen : new FormControl(imagen),
      titulo: new FormControl(titulo, [Validators.required]),
      descripcion : new FormControl(descripcion),
      color : new FormControl(color, [Validators.required])
    });
  }

  drop(event: CdkDragDrop<{titulo: string; imagen: string}[]>) {
    moveItemInArray(this.banners, event.previousIndex, event.currentIndex);
  }

  cambiarNuevo(){
    this.editMode=false;
    this.codigo='';
    this.posicion=0;
    this.clase='';
    this.imgURL=null;
    this.form.reset();
  }

  cambiarFormulario(banner: Banner){
    this.editMode=true;
    this.codigo=banner.codigo;
    this.posicion=banner.posicion;
    let imagen='';
    this.imgURL=banner.imagen;
    let titulo=banner.titulo;
    let descripcion=banner.descripcion;
    let color=banner.color;
    this.clase=banner.clase;

    this.form = new FormGroup({
      imagen : new FormControl(imagen),
      titulo: new FormControl(titulo, [Validators.required]),
      descripcion : new FormControl(descripcion),
      color : new FormControl(color, [Validators.required])
    });
  }

  preview(files:any) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  onSubmit(): void{
    let codigo = '';
    let imagen = this.form.value.imagen;
    const titulo = this.form.value.titulo;
    const descripcion = this.form.value.descripcion;
    const color = this.form.value.color;

    if(imagen=='' && !this.editMode){
      imagen="";
    }else{
      imagen=this.imgURL;
    }

    if(this.editMode){
      const banner = new Banner(this.codigo,this.posicion,imagen,color,titulo,descripcion,this.clase);
      this.bienvenidaService.updateBanner(banner);
      this.guardarOrden();
    }else{
      codigo = "BAN"+(this.bienvenidaService.getBanners().length+1);
      const banner = new Banner(codigo,this.banners.length+1,imagen,color,titulo,descripcion,'');
      this.bienvenidaService.addBanner(banner);
      this.guardarOrden();
      this.form.reset();
      this.imgURL=null;
    }
  }

  deleteBanner(banner: Banner){
    this.bienvenidaService.deleteBanner(banner);
    this.guardarOrden();
  }

  guardarOrden(){
    for(let i=0; i<this.banners.length; i++){
      if(i==0){
        this.banners[i].posicion=i;
        this.banners[i].clase="active";
      }else{
        this.banners[i].posicion=i;
        this.banners[i].clase="";
      }
    }
    this.bienvenidaService.updateBanners(this.banners);
  }

}
