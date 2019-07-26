package ioi.baku.app.ioiBaku.Controllers;

import ioi.baku.app.ioiBaku.Domain.ContestantData;
import ioi.baku.app.ioiBaku.Repositories.ContestantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController

public class ExportFromDatabase {
    @Autowired
    private ContestantRepository contestantRepository;
    private static final String CSV_SEPARATOR = ",";
    Logger log = LoggerFactory.getLogger("Logger INFO");

    @RequestMapping("/export")
    public String writer() {
        Iterable<ContestantData> all = contestantRepository.findAll();
        Iterator<ContestantData> iterator = all.iterator();
        List<ContestantData> contestantData = new ArrayList<>();
        while (iterator.hasNext()) {
            contestantData.add(iterator.next());
        }

        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("DATA_Export.csv"), "UTF-8"));
            for (ContestantData cd : contestantData) {
                StringBuffer oneLine = new StringBuffer();
                oneLine.append(cd.getId());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getMacAddress());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getIpAddress());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getSeat());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getLogin());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getName());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getSurname());

                bw.write(oneLine.toString());
                bw.newLine();
            }
            bw.flush();
            bw.close();
        } catch (Exception e) {
            log.info(e.toString());
        }


        return "Export is done SuccessFully";
    }
    @RequestMapping("/exportp")
    public String writerWithPath(@RequestParam(name="path", required = true) String path) {
        Iterable<ContestantData> all = contestantRepository.findAll();
        Iterator<ContestantData> iterator = all.iterator();
        List<ContestantData> contestantData = new ArrayList<>();
        while (iterator.hasNext()) {
            contestantData.add(iterator.next());
        }

        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), "UTF-8"));
            for (ContestantData cd : contestantData) {
                StringBuffer oneLine = new StringBuffer();
                oneLine.append(cd.getId());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getMacAddress());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getIpAddress());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getSeat());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getLogin());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getName());
                oneLine.append(CSV_SEPARATOR);
                oneLine.append(cd.getSurname());

                bw.write(oneLine.toString());
                bw.newLine();
            }
            bw.flush();
            bw.close();
        } catch (Exception e) {
            log.info(e.toString());
        }


        return "Export is done SuccessFully";
    }

}
