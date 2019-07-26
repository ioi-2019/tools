package ioi.baku.app.ioiBaku.Controllers;

import ioi.baku.app.ioiBaku.Domain.ContestantData;
import ioi.baku.app.ioiBaku.Repositories.ContestantRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;

import java.util.Optional;


@RestController
public class FindContestantData {

    @Autowired
    private ContestantRepository contestantRepository;

    Logger log = LoggerFactory.getLogger("Logger INFO");

    @PostMapping(path = "/contestant", produces = "application/json")
    public ContestantData findContestantData(HttpServletRequest request) {
        String remoteAddr = request.getRemoteAddr();
        ContestantData std = contestantRepository.findByIpAddress(remoteAddr);
        System.out.println(std);
        return std;
    }
    @RequestMapping("/contestant/{ip}")
    public ContestantData findByIP(@PathVariable(name="ip", required = true) String IP) {


        ContestantData contestant = contestantRepository.findByIpAddress(IP);

        return contestant;

    }



}
