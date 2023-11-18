import { useState, useEffect } from "react";
import moment from "moment-jalaali";

function usePredefinedDats() {
  const [ts, setts] = useState();
  const [tsu, settsu] = useState();
  const [te, sette] = useState();
  const [teu, setteu] = useState();
  const [ys, setys] = useState();
  const [ysu, setysu] = useState();
  const [ye, setye] = useState();
  const [yeu, setyeu] = useState();
  const [tms, settms] = useState();
  const [tmsu, settmsu] = useState();
  const [pms, setpms] = useState();
  const [pmsu, setpmsu] = useState();
  const [pme, setpme] = useState();
  const [pmeu, setpmeu] = useState();
  const [tws, settws] = useState();
  const [twsu, settwsu] = useState();
  const [pws, setpws] = useState();
  const [pwsu, setpwsu] = useState();
  const [pwe, setpwe] = useState();
  const [pweu, setpweu] = useState();
  const [tys, settys] = useState();
  const [tysu, settysu] = useState();
  const [pys, setpys] = useState();
  const [pysu, setpysu] = useState();
  const [pye, setpye] = useState();
  const [pyeu, setpyeu] = useState();
  useEffect(() => {
    // ---------------------- today ------------------------
    const currentDate = moment().format("YYYY-MM-DD");
    const jalaliCurrentDate = moment(currentDate, "YYYY-MM-DD").format(
      "jYYYY-jMM-jDD"
    );
    const ws = moment().startOf("week").format("jYYYY-jMM-jDD");

    setts(moment().format("jYYYY/jMM/jDD"));
    settsu(moment().startOf("day").unix());
    sette(moment().format("jYYYY/jMM/jDD"));
    setteu(moment().endOf("day").unix());
    // ---------------------- today ------------------------
    // ---------------------- yesterday ------------------------
    setys(
      moment(ts, "jYYYY/jMM/jDD").subtract(1, "day").format("jYYYY/jMM/jDD")
    );
    setysu(
      moment(ts, "jYYYY/jMM/jDD").subtract(1, "day").startOf("day").unix()
    );
    setye(
      moment(te, "jYYYY/jMM/jDD").subtract(1, "day").format("jYYYY/jMM/jDD")
    );
    setyeu(moment(te, "jYYYY/jMM/jDD").subtract(1, "day").endOf("day").unix());
    // ---------------------- yesterday ------------------------
    // ---------------------- this month ------------------------
    settms(
      moment(ts, "jYYYY/jMM/jDD").startOf("jMonth").format("jYYYY/jMM/jDD")
    );
    settmsu(moment(ts, "jYYYY/jMM/jDD").startOf("jMonth").unix());
    // ---------------------- this month ------------------------
    // ---------------------- prev month ------------------------
    setpms(
      moment(ts, "jYYYY/jMM/jDD")
        .subtract(1, "month")
        .startOf("jMonth")
        .format("jYYYY/jMM/jDD")
    );
    setpmsu(
      moment(ts, "jYYYY/jMM/jDD").subtract(1, "month").startOf("jMonth").unix()
    );
    setpme(
      moment(pms, "jYYYY/jMM/jDD").endOf("jMonth").format("jYYYY/jMM/jDD")
    );
    setpmeu(moment(pms, "jYYYY/jMM/jDD").endOf("jMonth").unix());
    // ---------------------- prev month ------------------------
    // ---------------------- this week ------------------------
    settws(moment(ts, "jYYYY/jMM/jDD").startOf("week").format("jYYYY/jM/jDD"));
    settwsu(moment(tws, "jYYYY/jMM/jDD").unix());
    // ---------------------- this week ------------------------
    // ---------------------- prev week ------------------------
    setpws(
      moment(ts, "jYYYY/jMM/jDD")
        .subtract(1, "week")
        .startOf("week")
        .format("jYYYY/jMM/jDD")
    );
    setpwsu(moment(pws, "jYYYY/jMM/jDD").unix());

    setpwe(moment(pws, "jYYYY/jMM/jDD").add(6, "days").format("jYYYY/jMM/jDD"));
    setpweu(moment(pwe, "jYYYY/jMM/jDD").endOf("day").unix());
    // ---------------------- prev week ------------------------
    // ---------------------- current year ------------------------
    settys(moment().startOf("jYear").format("jYYYY/jMM/jDD"));
    settysu(moment().startOf("jYear").unix());
    // ---------------------- current year ------------------------
    // ---------------------- past year ------------------------
    setpys(
      moment().startOf("jYear").subtract(1, "jYear").format("jYYYY/jMM/jDD")
    );
    setpye(
      moment().endOf("jYear").subtract(1, "jYear").format("jYYYY/jMM/jDD")
    );
    setpysu(moment().startOf("jYear").subtract(1, "jYear").unix());
    setpyeu(moment().endOf("jYear").subtract(1, "jYear").unix());
    // ---------------------- past year ------------------------
  }, [ts, te, pms, tws, pws, pwe]);

  return {
    ts,
    tsu,
    te,
    teu,
    ys,
    ysu,
    ye,
    yeu,
    tms,
    tmsu,
    pms,
    pmsu,
    pme,
    pmeu,
    tws,
    twsu,
    pws,
    pwsu,
    pwe,
    pweu,
    tys,
    tysu,
    pys,
    pysu,
    pye,
    pyeu,
  };
}

export default usePredefinedDats;
