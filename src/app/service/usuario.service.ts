import { EventEmitter, Injectable } from "@angular/core";
import { Usuario } from "../model/usuario.model";

@Injectable({ providedIn: 'root' })
export class UsuarioService{
    listChangedEvent: EventEmitter<Usuario[]> = new EventEmitter();
    listaUsuarios : Usuario[] = [
        new Usuario("dndjnd","Jesus Cruz Morales", "020499az@gmail.com", "https://scontent.fmid1-3.fna.fbcdn.net/v/t1.18169-9/1966841_748529828575351_259010861140306472_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHLHpwqdjAZSavfnd9t4sNczcO4uEHoVRLNw7i4QehVEgUL6iGmzIELvXkkBEEZz-MAfBzRGiS9VH2eCryG4c3v&_nc_ohc=UmyIZ_I2LJMAX9SK7CO&_nc_ht=scontent.fmid1-3.fna&oh=00_AT83Ux7d86og_GNOvuBoJN7roJaeQsQSQmwW4JtZD3ZxJA&oe=6375ABF8", "administrador"),
        new Usuario("dndjnd","Cora I.", "cora_i@hotmail.com", "https://scontent.fmid1-3.fna.fbcdn.net/v/t1.18169-9/1966841_748529828575351_259010861140306472_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHLHpwqdjAZSavfnd9t4sNczcO4uEHoVRLNw7i4QehVEgUL6iGmzIELvXkkBEEZz-MAfBzRGiS9VH2eCryG4c3v&_nc_ohc=UmyIZ_I2LJMAX9SK7CO&_nc_ht=scontent.fmid1-3.fna&oh=00_AT83Ux7d86og_GNOvuBoJN7roJaeQsQSQmwW4JtZD3ZxJA&oe=6375ABF8", "administrador"),
        new Usuario("dndjnd","Charlotte I.", "charlotte_i@hotmail.com", "https://scontent.fmid1-3.fna.fbcdn.net/v/t1.18169-9/1966841_748529828575351_259010861140306472_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHLHpwqdjAZSavfnd9t4sNczcO4uEHoVRLNw7i4QehVEgUL6iGmzIELvXkkBEEZz-MAfBzRGiS9VH2eCryG4c3v&_nc_ohc=UmyIZ_I2LJMAX9SK7CO&_nc_ht=scontent.fmid1-3.fna&oh=00_AT83Ux7d86og_GNOvuBoJN7roJaeQsQSQmwW4JtZD3ZxJA&oe=6375ABF8", "administrador"),
        new Usuario("dndjnd","Asher C.", "asher@hotmail.com", "https://scontent.fmid1-3.fna.fbcdn.net/v/t1.18169-9/1966841_748529828575351_259010861140306472_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHLHpwqdjAZSavfnd9t4sNczcO4uEHoVRLNw7i4QehVEgUL6iGmzIELvXkkBEEZz-MAfBzRGiS9VH2eCryG4c3v&_nc_ohc=UmyIZ_I2LJMAX9SK7CO&_nc_ht=scontent.fmid1-3.fna&oh=00_AT83Ux7d86og_GNOvuBoJN7roJaeQsQSQmwW4JtZD3ZxJA&oe=6375ABF8", "administrador"),
        new Usuario("dndjnd","Levi J.", "asher@hotmail.com", "https://scontent.fmid1-3.fna.fbcdn.net/v/t1.18169-9/1966841_748529828575351_259010861140306472_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHLHpwqdjAZSavfnd9t4sNczcO4uEHoVRLNw7i4QehVEgUL6iGmzIELvXkkBEEZz-MAfBzRGiS9VH2eCryG4c3v&_nc_ohc=UmyIZ_I2LJMAX9SK7CO&_nc_ht=scontent.fmid1-3.fna&oh=00_AT83Ux7d86og_GNOvuBoJN7roJaeQsQSQmwW4JtZD3ZxJA&oe=6375ABF8", "administrador"),
    ];

    getPaginas(){
        return this.listaUsuarios;
    }

    getPagina(id : string){
        return this.listaUsuarios.find(x => x.id == id);
    }

    agregarPagina(usuario: Usuario){
        this.listaUsuarios.push(usuario);
    }

    updatePagina(id: string, usuario: Usuario){
        this.listaUsuarios[this.findPagina(id)]=usuario;
    }

    findPagina(id: string){
        for(let i=0; i<this.listaUsuarios.length; i++){
            if(id==this.listaUsuarios[i].id)
                return i;
        }
        return 0;
    }
}