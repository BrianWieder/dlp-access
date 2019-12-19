import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ResultsNumberDropdown from "./collections/ResultsNumberDropdown";
import Pagination from "../shared/Pagination";
import { arkLinkFormatted } from "../shared/TextFormatTools";
import "../css/CollectionsListPage.css";

class CollectionsListPage extends Component {

  descFormatted(collection) {
    return collection.description.substring(0, 100) + "...";
  }

  dateFormatted(collection) {
    return (
      parseInt(collection.start_date) + "-" + parseInt(collection.end_date)
    );
  }

  sourceLink(collection) {
    return { __html: collection.source };
  }

  collectionsForPage() {
    const page = parseInt(this.props.page);
    const limit = parseInt(this.props.limit);
    const startIdx = Math.min(
      (page - 1) * limit,
      this.props.collections.length - 1
    );
    const endIdx = Math.min(startIdx + limit, this.props.collections.length);

    return this.props.collections.slice(startIdx, endIdx)
  }

  render() {
    let collectionsList = this.collectionsForPage();
    return (
      <div>
        <h3>Collections List</h3>
        <ResultsNumberDropdown
          page={this.props.page}
        />
        <ul>
          {collectionsList.map(collection => (
            <li key={collection.id} className="collection-entry">
              <h4 className="collection-title">
                <NavLink
                  to={`/collection/${arkLinkFormatted(collection.custom_key)}`}
                >
                  {collection.title}
                </NavLink>
              </h4>
              <span className="collection-img">
                <img src={collection.thumbnail_path} alt={collection.title} />
              </span>
              <div className="collection-details">
                <div className="collection-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td className="collection-detail-key">Identifier:</td>
                        <td className="collection-detail-value">
                          {collection.identifier}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="collection-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td className="collection-detail-key">Description:</td>
                        <td className="collection-detail-value">
                          {this.descFormatted(collection)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="collection-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td className="collection-detail-key">Date:</td>
                        <td className="collection-detail-value">
                          {this.dateFormatted(collection)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="collection-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td className="collection-detail-key">Source:</td>
                        <td
                          className="collection-detail-value"
                          dangerouslySetInnerHTML={this.sourceLink(collection)}
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="collection-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td className="collection-detail-key">Language:</td>
                        <td className="collection-detail-value">
                          {collection.language}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="collection-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td className="collection-detail-key">Creator:</td>
                        <td className="collection-detail-value">
                          {collection.creator}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Pagination
          collections={this.props.collections}
          page={this.props.page}
          limit={this.props.limit}
        />
      </div>
    );
  }
}

export default CollectionsListPage;