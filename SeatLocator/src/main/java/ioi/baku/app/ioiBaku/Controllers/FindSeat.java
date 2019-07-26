package ioi.baku.app.ioiBaku.Controllers;

import ioi.baku.app.ioiBaku.Domain.ContestantData;
import ioi.baku.app.ioiBaku.Repositories.ContestantRepository;
import org.json.JSONObject;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;


@Controller
public class FindSeat {

    @Autowired
    private ContestantRepository contestantRepository;

    Logger log = LoggerFactory.getLogger("Logger INFO");

    @GetMapping("/seat")
    public String findSeat(HttpServletRequest request, Model model) {
        String remoteAddr = request.getRemoteAddr();
        ContestantData std = contestantRepository.findByIpAddress(remoteAddr);
        model.addAttribute("seatFind", std);
        return "seat";
    }

    @PostMapping("/save")
    public String update(@Valid @ModelAttribute ContestantData ctd) {
        System.out.println(ctd);
        contestantRepository.save(ctd);
        return "redirect:seat";

    }
}



