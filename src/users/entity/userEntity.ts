import { faker } from '@faker-js/faker';
// мок используется для показа работы в unit-тестов
export class UserEntity {
    id: string;
    login: string;
    password: string;
    name: string;

    private static users: UserEntity[] = [
        {
            "id": "6f0cff6d-02b0-4bc6-8b5e-0d4a39c85eb6",
            "login": "John72@hotmail.com",
            "password": "tdEYsTP9Y4Tydyi",
            "name": "Eliseo_Kautzer21"
        },
        {
            "id": "e5f4d8be-3edb-46b7-ab8e-18faaf353011",
            "login": "Elwyn_Ryan@gmail.com",
            "password": "KLwE6vKqhCkMLk7",
            "name": "Ephraim10"
        },
        {
            "id": "38ecbd92-38a3-4db6-af6e-738bce76f318",
            "login": "Oleta_Quitzon7@yahoo.com",
            "password": "Bzti6OqnQFeZ07v",
            "name": "Rosalinda_Lakin12"
        },
        {
            "id": "e9d37036-7887-46fb-9790-9ec9f545f96a",
            "login": "Alphonso.Bosco78@hotmail.com",
            "password": "E0A5P9tNzoguKTK",
            "name": "Chesley_Beer28"
        },
        {
            "id": "fa54bc1f-b7dc-4650-9571-4feee95c1e2f",
            "login": "Darlene_Walsh@hotmail.com",
            "password": "EFGrFTmaSAuC5FE",
            "name": "Jeffery.Steuber"
        },
        {
            "id": "83256ef4-9fc2-4bf3-ae8c-045116757fb4",
            "login": "Bernie_Sanford@gmail.com",
            "password": "GJvbio1VsuvLJvM",
            "name": "Paul_Schneider"
        },
        {
            "id": "e7456d8c-ca2f-4f6b-acfe-789ea6def0d7",
            "login": "Trudie_Spinka48@hotmail.com",
            "password": "ixdfzDiRwFnHsGw",
            "name": "Tristian21"
        },
        {
            "id": "6db0feb1-6463-41b9-9a65-f4e2be920aa4",
            "login": "Nickolas_Bogan@hotmail.com",
            "password": "RzSLd5Eba9qrVQN",
            "name": "Abdullah_Skiles6"
        },
        {
            "id": "7d96da91-b8fa-491e-8c49-799cb4e7bd1b",
            "login": "Lupe17@gmail.com",
            "password": "C0Sk9ufPKemEdue",
            "name": "Nettie97"
        },
        {
            "id": "300241b9-05f0-4123-b16b-676b062c16de",
            "login": "Kelly31@yahoo.com",
            "password": "UGINA2titLxYw8d",
            "name": "Lacey.Morar"
        },
        {
            "id": "a0b98445-bbbc-4ad1-82b3-d94e4dbc505a",
            "login": "Dante_Lesch@hotmail.com",
            "password": "xSlPblFmB4sPLVC",
            "name": "Rhianna.Koss78"
        },
        {
            "id": "ad0e7a95-f1d2-4c30-ad76-66d111dad5a4",
            "login": "Gaston_Daniel25@gmail.com",
            "password": "TuZNGJXJ1udtxBd",
            "name": "Verona_Strosin"
        },
        {
            "id": "7903a700-d7e8-4748-b59f-4b4fbc9816b9",
            "login": "Joseph_West44@gmail.com",
            "password": "dFBnQXEjKr04TqU",
            "name": "Quinton47"
        },
        {
            "id": "abd060f4-77d8-4c4e-9745-de61bee0d62d",
            "login": "Damian_Will34@yahoo.com",
            "password": "VIbgZCPqfoMi0fv",
            "name": "Sandy24"
        },
        {
            "id": "eac53417-5e8e-4566-beb0-35cb13c4788e",
            "login": "Frank.Botsford25@hotmail.com",
            "password": "iOfoyQeUJacYKeY",
            "name": "Zechariah86"
        },
        {
            "id": "671fab3d-10db-4eeb-ae9d-78dfbd458488",
            "login": "Justyn32@hotmail.com",
            "password": "v2Qfi6T3hDZ63a4",
            "name": "Chesley19"
        },
        {
            "id": "977c9fd4-99b1-4e41-8c62-060715a82a61",
            "login": "Cristopher_Bashirian@hotmail.com",
            "password": "WCza38P2BHmY7S1",
            "name": "Allene.Larkin"
        },
        {
            "id": "bb177c47-e0c8-4bba-a20c-8a6ea0e027a5",
            "login": "Corine_Rath@gmail.com",
            "password": "Zg0dklKvIbXds16",
            "name": "Melisa19"
        },
        {
            "id": "18302806-b60d-4bc2-8152-e3911f2071e1",
            "login": "Moshe.Gutkowski@gmail.com",
            "password": "oloeHEeumXmXyhG",
            "name": "Delmer_Bartell"
        },
        {
            "id": "21d2f40c-2fa2-4504-b87b-67c5adfd818c",
            "login": "Queenie_Flatley@gmail.com",
            "password": "M_8wfrENlj01TH8",
            "name": "Giovanny.Ziemann83"
        }
    ]

    static async findAll(): Promise<UserEntity[]>{
        return this.users;
    }

    static async findById(ids: string): Promise<UserEntity>{
        return this.users.find((x:{id: string})=> x.id ===ids)
    }

    static async Save(user: UserEntity): Promise<UserEntity>{
        if(!user.id) {
            user.id = faker.datatype.uuid();
            this.users.push(user);
            return user;
        }else{
            let index = this.users.findIndex((x: {id: string}) => x.id === user.id);
            if(user.name)
                this.users[index].name = user.name;
            if(user.password)
                this.users[index].password = user.password;
            return this.users[index];
        }
    }
    static async Delete(ids: string): Promise<boolean>{
        try {
            let index = this.users.findIndex((x: {id: string}) => x.id === ids);
            if(index > -1) {
                this.users.splice(index, 1);
                return true;
            }else{
                return false;
            }
        }catch (e) {
            return false;
        }
    }
}

