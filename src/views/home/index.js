import React from "react";
import marker from "./../../assets/marker.png";
import pontoImage from "./../../assets/map_ponto.png";
import ReactMapGL, { Marker } from "react-map-gl";
import service from "./../../service/service";
import { Card, CardBody, CardImg, CardTitle, CardText, Fade } from "reactstrap";
const TOKEN =
  "pk.eyJ1IjoibXRoZXVzIiwiYSI6ImNqcWl1N3l0azAyb2EzeHFzYnZ6NXB4d3IifQ.dg21_RuTc0FJqVFPmM-lJQ";

export default class Map extends React.Component {
  componentDidMount() {
    service.findAll("pontos", dataReceived =>
      this.setState({ pontos: dataReceived })
    );
  }
  constructor(props) {
    super(props);
    // this.state = { fadeIn: false };

    this.state = {
      url: "",
      fadeIn: false,
      viewport: {
        latitude: -21.2065,
        longitude: -41.8896,
        zoom: 15,
        bearing: 29,
        pitch: 50,
        width: window.innerWidth,
        height: window.innerHeight
      },
      pontos: [],
      ponto: null
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(ponto) {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
    if (ponto) {
      this.setState({ ponto: ponto });
    }
  }
  // state = {

  // }

  render() {
    const { ponto, fadeIn } = this.state;

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="btn btn-outline-light mx-auto" href="/adm">
            Acessar painel
          </a>
        </nav>
        <ReactMapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {this.state.pontos.map(ponto => {
            return (
              <Marker
                latitude={ponto.latitude}
                longitude={ponto.longitude}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div>
                  <img
                    onMouseEnter={() => this.toggle(ponto)}
                    onMouseLeave={() => this.toggle("asfasd")}
                    src={marker}
                    width={25}
                    height={25}
                    title={ponto.local}
                    alt="Ponto"
                  />
                </div>
              </Marker>
            );
          })}

          {fadeIn === true ? (
            <div className="card-pontos">
              <Fade in={true}>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={ponto.url ? ponto.url : pontoImage}
                    alt="Card image cap"
                  />

                  <CardBody>
                    <CardTitle>{ponto.local}</CardTitle>

                    <CardText>
                      <section>
                        <div>
                          {ponto.inicio} ás {ponto.termino}
                        </div>
                        <div>
                          {ponto.dias
                            ? Object.keys(ponto.dias).map(key => {
                                return (
                                  <div
                                    style={{ display: "inline-block" }}
                                    key={key}
                                  >
                                    <div
                                      style={{ marginLeft: "3px" }}
                                      key={key}
                                    >
                                      {ponto.dias[key].label},{" "}
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                        <div>{ponto.descricao}</div>
                      </section>
                    </CardText>
                  </CardBody>
                </Card>
              </Fade>
            </div>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
}
