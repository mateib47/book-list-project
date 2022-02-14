package com.booklist.view;

import com.booklist.appuser.AppUser;
import com.booklist.appuser.AppUserRepository;
import com.booklist.books.Books;
import com.booklist.books.BooksRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ViewService {
    private BooksRepository booksRepository;
    private AppUserRepository appUserRepository;

    public String viewBookList(String email){
        String list = "<ul class=\"book-list-js book-list\">";
        AppUser appUser = appUserRepository.findByEmail(email).get();
        List<Books[]> books = booksRepository.getAllByAppUser(appUser);
        for(int i = 0; i < books.size();i++){
            Books book = books.get(i)[0];
            list += "<li class='book-item "+ book.getStatus() + "'" + "onclick='showModal(document.getElementById('details-"+book.getId()+"'))' "
                    + "data-key='"+ book.getId() +"'" + ">" + book.getTitle() + "</li>";
        }
        list += "</ul>";
        String html = "<!DOCTYPE html>" +
                "<html lang=\"en\"><head>   " +
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/style.css\">  " +
                "<meta content=\"width=device-width, initial-scale=1\" name=\"viewport\" /> " +
                "  <link rel=\"icon\" href=\"images/tab-icon.png\">" +
                "<title>My Book List</title>" +
                "  </head><body><main>" +
                "<h1 id=\"title\" class=\"\">"+appUser.getName()+"\\'s" +
                " Book List</h1>" +
                "<p>This is a list with the books that I read and that I am planning to read</p>" +
                "   "+ list +"    </main>" +
                "<script type=\"text/javascript\" src=\"js/authorBooklist.js\"></script>" +
                "  </body></html>";
        return html;
    }
}
