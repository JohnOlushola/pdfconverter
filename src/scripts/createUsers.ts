import { UserModel } from '../database/users/users.model';
import bcrypt from 'bcrypt'

(async () => {

    const users = [
        { firstName: "Olushola", lastName: "Awoyemi", email: "sholaawoyemi@joawoyemiandco.com", password: 'shola01', permission: 0, dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Temiloluwa", lastName: "Olushola", email: "office@joawoyemiandco.com", permission: 0, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Bamidele", lastName: "Ilo", email: "bamideleilo@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Seun", lastName: "Aina", email: "seunaina@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Alonge", lastName: "Idowu", email: "idowualonge@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Toyin", lastName: "Faleye", email: "faleyetoyin@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Femi", lastName: "Olayiwola", email: "femiolayiwola@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Janet", lastName: "James", email: "janetjames@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Victoria", lastName: "Onibonoje", email: "onibonojevictoria@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Opeyemi", lastName: "Momoh", email: "opeyemimomoh@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Ronke", lastName: "Agbaje", email: "ronkeagbaje@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Tosin", lastName: "Eketunde", email: "tosineketunde@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
        { firstName: "Wumi", lastName: "Olagbaju", email: "wumiolagbaju@joawoyemiandco.com", permission: 1, password: 'shola01', dateOfEntry: Date.now(), lastUpdated: Date.now() },
    ];



    try {
        for (let user of users) {
            user.password = bcrypt.hashSync(user.password, 'convert');
            await UserModel.create(user)
                .then((user) => {
                    console.log(`Created user ${user.firstName} ${user.lastName}`);
                })
                .catch(e => {
                    console.log(e)
                });
        }

    }
    catch (e) {
        console.log(e);
    }
})
